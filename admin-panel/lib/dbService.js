import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from 'dns';
import Admin from '@/models/Admin';
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
  let data = { admins: [], contacts: [] };
  let needsWrite = false;

  if (fs.existsSync(LOCAL_DB_PATH)) {
    try {
      const fileContent = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (e) {
      needsWrite = true;
    }
  } else {
    needsWrite = true;
  }

  if (!data.admins || data.admins.length === 0) {
    const hashedPassword = bcrypt.hashSync('admin', 12);
    data.admins = [
      {
        _id: 'local-admin-id',
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];
    needsWrite = true;
  }

  if (!data.contacts) {
    data.contacts = [];
    needsWrite = true;
  }

  if (needsWrite) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  }
}

// Helper to read local JSON database
function readLocalDb() {
  initLocalDb();
  try {
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local db, resetting:', err);
    // If corrupt, reset it
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify({ admins: [], contacts: [] }, null, 2));
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

export async function getAdminByEmail(email) {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    const admin = db.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
    return admin || null;
  }
  return await Admin.findOne({ email });
}

export async function comparePassword(admin, candidatePassword) {
  if (global.useLocalDb) {
    return bcrypt.compareSync(candidatePassword, admin.password);
  }
  // Mongoose documents have comparePassword, plain object doesn't
  if (admin && typeof admin.comparePassword === 'function') {
    return await admin.comparePassword(candidatePassword);
  }
  return await bcrypt.compare(candidatePassword, admin.password);
}

export async function countMessages() {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    return db.contacts.length;
  }
  return await Contact.countDocuments();
}

export async function getRecentMessages(limit) {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    const sorted = [...db.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted.slice(0, limit);
  }
  const messages = await Contact.find({}).sort({ createdAt: -1 }).limit(limit).lean();
  return messages.map(m => ({
    ...m,
    _id: m._id.toString(),
    createdAt: m.createdAt.toISOString ? m.createdAt.toISOString() : m.createdAt,
  }));
}

export async function getAllMessages() {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    const sorted = [...db.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted;
  }
  const messages = await Contact.find({}).sort({ createdAt: -1 }).lean();
  return messages.map(m => ({
    ...m,
    _id: m._id.toString(),
    createdAt: m.createdAt.toISOString ? m.createdAt.toISOString() : m.createdAt,
    updatedAt: m.updatedAt.toISOString ? m.updatedAt.toISOString() : m.updatedAt,
  }));
}

export async function deleteMessage(id) {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    const index = db.contacts.findIndex(c => c._id === id);
    if (index === -1) return null;
    const deleted = db.contacts.splice(index, 1)[0];
    writeLocalDb(db);
    return deleted;
  }
  return await Contact.findByIdAndDelete(id);
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
