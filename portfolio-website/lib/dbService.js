import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dns from 'dns';
import Contact from '@/models/Contact';
import Project from '@/models/Project';
import SkillCategory from '@/models/Skill';

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

// ─── Default seed data ───────────────────────────────────────────────────────

const DEFAULT_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'Brain Tumor Detection System using CNN & Transfer Learning',
    date: 'Jan 2026',
    description: [
      'Built a deep learning image classification model using MobileNetV2, TensorFlow, and Keras to detect brain tumors from MRI images.',
      'Developed a full-stack web application using React and Flask REST API for real-time tumor prediction and visualization.',
    ],
    tags: ['Python', 'TensorFlow', 'React', 'Flask'],
    link: '#',
    category: 'AI/ML',
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj-2',
    title: 'E-Commerce Platform',
    date: 'Dec 2025',
    description: [
      'Developed a full-stack e-commerce platform using Laravel, Bootstrap, CSS, and MySQL, integrating PayHere payment gateway and an admin dashboard for product and order management.',
    ],
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    link: '#',
    category: 'Web',
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj-3',
    title: 'AI-Based Mango Disease Detection System',
    date: 'Sep 2025',
    description: [
      'Developed a CNN-based computer vision model using TensorFlow/Keras to detect mango fruit diseases from images with automated classification.',
      'Built a full-stack web application using React and Flask, integrating an AI chatbot to provide disease diagnosis and treatment recommendations.',
    ],
    tags: ['Python', 'TensorFlow', 'React', 'Flask'],
    link: '#',
    category: 'AI/ML',
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj-4',
    title: 'IoT-Based Gas Leakage Detection System',
    date: 'May 2025',
    description: [
      'Developed an IoT-based gas leakage detection system using MQ-2 sensor, HX711 load cell, and Blynk, enabling real-time gas leak detection, cylinder weight monitoring, and instant mobile/email safety alerts.',
    ],
    tags: ['IoT', 'Arduino', 'Blynk'],
    link: '#',
    category: 'IoT',
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj-5',
    title: 'Freelancer Job Posting & Finding Platform',
    date: 'Dec 2024',
    description: [
      'Developed a job marketplace web platform using PHP and MySQL enabling clients to post jobs and freelancers to find opportunities.',
    ],
    tags: ['PHP', 'MySQL'],
    link: '#',
    category: 'Web',
    order: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj-6',
    title: 'Cafe Management System',
    date: 'Jan 2023',
    description: [
      'Automated billing and inventory control using an HTML, Bootstrap, JS, and CSS web application to improve reporting efficiency and operational security.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    link: '#',
    category: 'Web',
    order: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEFAULT_SKILL_CATEGORIES = [
  {
    _id: 'skill-1',
    categoryTitle: 'Frontend Development',
    icon: '🎨',
    order: 1,
    skills: [
      { name: 'HTML & CSS', level: 'Advanced', pct: 92 },
      { name: 'JavaScript (ES6+)', level: 'Advanced', pct: 88 },
      { name: 'React.js', level: 'Advanced', pct: 85 },
      { name: 'Next.js', level: 'Intermediate', pct: 80 },
      { name: 'Tailwind CSS', level: 'Advanced', pct: 85 },
      { name: 'Bootstrap', level: 'Advanced', pct: 88 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'skill-2',
    categoryTitle: 'Backend Development',
    icon: '⚙️',
    order: 2,
    skills: [
      { name: 'Node.js', level: 'Intermediate', pct: 78 },
      { name: 'Next.js API Routes', level: 'Intermediate', pct: 76 },
      { name: 'PHP', level: 'Intermediate', pct: 72 },
      { name: 'Laravel', level: 'Intermediate', pct: 70 },
      { name: 'Flask (Python)', level: 'Intermediate', pct: 75 },
      { name: 'REST API Design', level: 'Intermediate', pct: 78 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'skill-3',
    categoryTitle: 'AI / Machine Learning',
    icon: '🤖',
    order: 3,
    skills: [
      { name: 'Python', level: 'Advanced', pct: 90 },
      { name: 'TensorFlow / Keras', level: 'Intermediate', pct: 78 },
      { name: 'scikit-learn', level: 'Intermediate', pct: 75 },
      { name: 'Computer Vision (CV2)', level: 'Intermediate', pct: 73 },
      { name: 'Pandas & NumPy', level: 'Advanced', pct: 85 },
      { name: 'Matplotlib / Seaborn', level: 'Advanced', pct: 82 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'skill-4',
    categoryTitle: 'Database & Cloud',
    icon: '🗄️',
    order: 4,
    skills: [
      { name: 'MongoDB', level: 'Intermediate', pct: 76 },
      { name: 'MySQL', level: 'Advanced', pct: 82 },
      { name: 'Mongoose ODM', level: 'Intermediate', pct: 74 },
      { name: 'Firebase', level: 'Beginner', pct: 55 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'skill-5',
    categoryTitle: 'Tools & DevOps',
    icon: '🛠️',
    order: 5,
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', pct: 88 },
      { name: 'VS Code', level: 'Advanced', pct: 95 },
      { name: 'Jupyter Notebook', level: 'Advanced', pct: 90 },
      { name: 'Postman', level: 'Intermediate', pct: 78 },
      { name: 'Docker (Basics)', level: 'Beginner', pct: 50 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'skill-6',
    categoryTitle: 'Soft Skills',
    icon: '💡',
    order: 6,
    skills: [
      { name: 'Problem Solving', level: 'Advanced', pct: 90 },
      { name: 'Team Collaboration', level: 'Advanced', pct: 88 },
      { name: 'Project Leadership', level: 'Intermediate', pct: 80 },
      { name: 'Technical Writing', level: 'Intermediate', pct: 76 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ─── Local DB helpers ─────────────────────────────────────────────────────────

function initLocalDb() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const initialData = {
      admins: [],
      contacts: [],
      projects: DEFAULT_PROJECTS,
      skillCategories: DEFAULT_SKILL_CATEGORIES,
    };
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return;
  }

  // File exists — ensure projects/skillCategories keys exist
  try {
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    let changed = false;
    if (!data.projects || data.projects.length === 0) {
      data.projects = DEFAULT_PROJECTS;
      changed = true;
    }
    if (!data.skillCategories || data.skillCategories.length === 0) {
      data.skillCategories = DEFAULT_SKILL_CATEGORIES;
      changed = true;
    }
    if (changed) fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // ignore parse errors — admin-panel will handle recovery
  }
}

function readLocalDb() {
  initLocalDb();
  try {
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local db:', err);
    return { admins: [], contacts: [], projects: [], skillCategories: [] };
  }
}

function writeLocalDb(data) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── DB connection ─────────────────────────────────────────────────────────────

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
      serverSelectionTimeoutMS: 3000,
    };
    await mongoose.connect(MONGODB_URI, opts);
    console.log('✅ Connected to MongoDB Atlas successfully.');
  } catch (error) {
    console.warn('⚠️ MongoDB Atlas connection failed. Falling back to local JSON database.');
    global.useLocalDb = true;
    initLocalDb();
  }
}

// ─── Contact functions ─────────────────────────────────────────────────────────

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

// ─── Project functions ─────────────────────────────────────────────────────────

export async function getProjects() {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    return [...(db.projects || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  // Seed if empty
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(
      DEFAULT_PROJECTS.map(({ _id, ...rest }) => rest)
    );
  }

  const projects = await Project.find({}).sort({ order: 1 }).lean();
  return projects.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    updatedAt: p.updatedAt?.toISOString?.() ?? p.updatedAt,
  }));
}

// ─── Skill functions ─────────────────────────────────────────────────────────

export async function getSkillCategories() {
  await connectDB();
  if (global.useLocalDb) {
    const db = readLocalDb();
    return [...(db.skillCategories || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  // Seed if empty
  const count = await SkillCategory.countDocuments();
  if (count === 0) {
    await SkillCategory.insertMany(
      DEFAULT_SKILL_CATEGORIES.map(({ _id, ...rest }) => rest)
    );
  }

  const cats = await SkillCategory.find({}).sort({ order: 1 }).lean();
  return cats.map(c => ({
    ...c,
    _id: c._id.toString(),
    createdAt: c.createdAt?.toISOString?.() ?? c.createdAt,
    updatedAt: c.updatedAt?.toISOString?.() ?? c.updatedAt,
  }));
}
