import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dns from 'dns';
import Contact from '@/models/Contact';

// Patch global dns.lookup for this process to bypass local ISP DNS issues with MongoDB Atlas
const originalLookup = dns.lookup;
dns.lookup = (hostname, options, callback) => {
  let actualOptions = options;
  let actualCallback = callback;

  if (typeof options === 'function') {
    actualCallback = options;
    actualOptions = {};
  }

  if (hostname && hostname.endsWith('mongodb.net')) {
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8', '1.1.1.1']);
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return originalLookup(hostname, actualOptions, actualCallback);
      }

      if (actualOptions && actualOptions.all) {
        const addrObjects = addresses.map(addr => ({ address: addr, family: 4 }));
        actualCallback(null, addrObjects);
      } else {
        actualCallback(null, addresses[0], 4);
      }
    });
  } else {
    originalLookup(hostname, actualOptions, actualCallback);
  }
};

const MONGODB_URI = process.env.MONGODB_URI;
const LOCAL_DB_PATH = path.join(process.cwd(), '..', 'local-db.json');

// Helper to initialize local DB file if it doesn't exist
function initLocalDb() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const initialData = {
      admins: [],
      contacts: [],
    };
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Helper to read local JSON database
function readLocalDb() {
  initLocalDb();
  try {
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local db:', err);
    return { admins: [], contacts: [] };
  }
}

// Helper to write to local JSON database
function writeLocalDb(data) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function connectDB() {
  if (global.useLocalDb) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // Timeout after 3 seconds
    };
    await mongoose.connect(MONGODB_URI, opts);
    console.log('✅ Connected to MongoDB Atlas successfully.');
  } catch (error) {
    console.warn('⚠️ MongoDB Atlas connection failed. Falling back to local JSON database.');
    global.useLocalDb = true;
    initLocalDb();
  }
}

export async function createMessage({ name, email, phone, message }) {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    const newMsg = {
      _id: 'msg-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.contacts.push(newMsg);
    writeLocalDb(db);
    return newMsg;
  }
  return await Contact.create({ name, email, phone, message });
}
