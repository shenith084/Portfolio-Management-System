# Portfolio Management System

A full-stack portfolio management system with a public-facing portfolio website and a secure admin panel — built with Next.js, MongoDB, and JWT authentication.

---

## System Overview

| App | Port | Purpose |
|-----|------|---------|
| `portfolio-website` | 3000 | Public portfolio — Home, About, Projects, Skills, Contact |
| `admin-panel` | 3001 | Admin — login, manage messages, projects & skills |

Both apps share the same **MongoDB database** (`portfolio-management`).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 + Vanilla CSS Variables |
| Database | MongoDB (via Mongoose) |
| Auth | JWT (via `jose`) + bcryptjs |
| Language | JavaScript (ES6+) |

---

## Project Structure

```
Portfolio-Management-System/
├── local-db.json                # Auto-generated offline fallback database
│
├── portfolio-website/           # Public-facing portfolio (port 3000)
│   ├── app/
│   │   ├── layout.js            # Root layout (Navbar + Footer)
│   │   ├── page.js              # Home Page
│   │   ├── about/page.js        # About Page (static)
│   │   ├── projects/page.js     # Projects Page ← DB-driven (Task 02)
│   │   ├── skills/page.js       # Skills Page ← DB-driven (Task 02)
│   │   ├── contact/page.js      # Contact Page (info + form)
│   │   ├── globals.css          # Design system (CSS variables)
│   │   └── api/
│   │       ├── contact/route.js # POST — saves contact form to MongoDB
│   │       ├── projects/route.js# GET  — fetches projects from MongoDB (Task 02)
│   │       └── skills/route.js  # GET  — fetches skills from MongoDB (Task 02)
│   ├── components/
│   │   ├── Navbar.js            # Responsive navigation with active states
│   │   ├── Footer.js            # Site footer with nav + social links
│   │   ├── HeroSection.js       # Animated typewriter hero section
│   │   └── ContactForm.js       # Validated contact form with API integration
│   ├── lib/
│   │   └── dbService.js         # DB connection, Contact/Project/Skill helpers + seeding
│   ├── models/
│   │   ├── Contact.js           # Contact Mongoose schema
│   │   ├── Project.js           # Project Mongoose schema (Task 02)
│   │   └── Skill.js             # SkillCategory Mongoose schema (Task 02)
│   └── .env.local               # MONGODB_URI
│
└── admin-panel/                 # Admin Dashboard (port 3001)
    ├── app/
    │   ├── layout.js            # Root layout
    │   ├── page.js              # Redirects to /login
    │   ├── globals.css          # Admin design system (dark theme)
    │   ├── login/page.js        # Branded admin login page
    │   ├── dashboard/
    │   │   ├── layout.js        # Dashboard shell (Sidebar + Header)
    │   │   ├── page.js          # Dashboard — stats (messages, projects, skills) + quick links
    │   │   ├── messages/page.js # Messages table (view + delete)
    │   │   ├── projects/page.js # Projects management (Task 02)
    │   │   └── skills/page.js   # Skills management (Task 02)
    │   └── api/
    │       ├── login/route.js        # POST   — Login, issue JWT cookie
    │       ├── logout/route.js       # POST   — Clear JWT cookie
    │       ├── messages/route.js     # GET    — Fetch all messages
    │       │                         # DELETE — Delete message by ID
    │       ├── admin/projects/route.js # GET/POST/PUT/DELETE — Projects CRUD (Task 02)
    │       └── admin/skills/route.js   # GET/POST/PUT/DELETE — Skills CRUD (Task 02)
    ├── proxy.js                  # JWT middleware — protects all /dashboard/* routes
    ├── components/
    │   ├── Sidebar.js            # Sidebar with active nav links (Messages, Projects, Skills)
    │   ├── Header.js             # Admin header with page title + avatar
    │   ├── DashboardShell.js     # Layout wrapper (sidebar + header + content)
    │   ├── MessageTable.js       # Messages table with expandable rows + delete
    │   ├── ProjectTable.js       # Projects table with Add/Edit/Delete drawer (Task 02)
    │   └── SkillTable.js         # Skills table with expandable rows + drawer (Task 02)
    ├── lib/
    │   └── dbService.js          # DB connection + full CRUD for all collections
    ├── models/
    │   ├── Admin.js              # Admin schema (bcrypt password hashing)
    │   ├── Contact.js            # Contact schema
    │   ├── Project.js            # Project schema (Task 02)
    │   └── Skill.js              # SkillCategory schema (Task 02)
    └── .env.local                # MONGODB_URI + JWT_SECRET
```

---

## Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

### 2. Setup Portfolio Website
```bash
cd portfolio-website
# .env.local is already configured for local MongoDB
npm install
npm run dev        # → http://localhost:3000
```

### 3. Setup Admin Panel
```bash
cd admin-panel
# Edit .env.local — set a strong JWT_SECRET for production!
npm install
npm run dev        # → http://localhost:3001
```

### 4. Create Your First Admin Account

You need to manually seed an admin user in MongoDB since there is no public registration.

Open your MongoDB shell or MongoDB Compass and run:

```js
// In MongoDB Shell (mongosh)
use portfolio-management

// Insert an admin (bcrypt-hash your password first)
// Node.js one-liner to generate a hash:
// node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourPassword', 12).then(h => console.log(h))"

db.admins.insertOne({
  name: "Shenith Chanidu",
  email: "admin@example.com",
  password: "<bcrypt-hash-of-your-password>",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

> **Offline mode shortcut:** If MongoDB is unavailable, the system falls back to `local-db.json` automatically. The default local admin credentials are `admin@example.com` / `admin`.

---

## Database Collections

All apps connect to the `portfolio-management` database. Collections are **auto-seeded** with default data on first load if empty.

### `admins` — Admin credentials

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Auto |
| name | String | Admin display name |
| email | String | Unique, lowercase |
| password | String | bcrypt-hashed (12 rounds) |
| createdAt | Date | Auto |

### `contacts` — Contact form submissions

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Auto |
| name | String | Visitor full name |
| email | String | Visitor email |
| phone | String | Optional phone number |
| message | String | The message body |
| createdAt | Date | Auto |

### `projects` — Portfolio projects *(added in Task 02)*

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Auto |
| title | String | Project title (required) |
| date | String | e.g. "Jan 2026" |
| description | [String] | Array of bullet points |
| tags | [String] | Technology tags |
| link | String | Repository or live URL |
| category | String | AI/ML, Web, IoT, Data, General |
| order | Number | Display order (ascending) |
| createdAt / updatedAt | Date | Auto |

### `skillcategories` — Skill categories *(added in Task 02)*

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Auto |
| categoryTitle | String | e.g. "Frontend Development" |
| icon | String | Emoji icon |
| order | Number | Display order (ascending) |
| skills | [Object] | Embedded skill items (see below) |
| createdAt / updatedAt | Date | Auto |

**Embedded skill item:**

| Field | Type | Notes |
|-------|------|-------|
| name | String | Skill name |
| level | String | Advanced / Intermediate / Beginner |
| pct | Number | Proficiency percentage (0–100) |

---

## API Reference

### Portfolio Website (`localhost:3000`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | None | Submit contact form message |
| GET | `/api/projects` | None | Fetch all projects (sorted by order) |
| GET | `/api/skills` | None | Fetch all skill categories (sorted by order) |

### Admin Panel (`localhost:3001`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/login` | None | Login — issues JWT cookie |
| POST | `/api/logout` | None | Logout — clears JWT cookie |
| GET | `/api/messages` | JWT | Fetch all contact messages |
| DELETE | `/api/messages?id=` | JWT | Delete a message by ID |
| GET | `/api/admin/projects` | JWT | Fetch all projects |
| POST | `/api/admin/projects` | JWT | Create a new project |
| PUT | `/api/admin/projects?id=` | JWT | Update a project |
| DELETE | `/api/admin/projects?id=` | JWT | Delete a project |
| GET | `/api/admin/skills` | JWT | Fetch all skill categories |
| POST | `/api/admin/skills` | JWT | Create a new skill category |
| PUT | `/api/admin/skills?id=` | JWT | Update a skill category |
| DELETE | `/api/admin/skills?id=` | JWT | Delete a skill category |

---

## System Flow

```
Visitor → Portfolio Website (port 3000)
            ├─ /projects  → GET /api/projects  → MongoDB (projects collection)
            ├─ /skills    → GET /api/skills    → MongoDB (skillcategories collection)
            └─ /contact   → POST /api/contact  → MongoDB (contacts collection)
                                                        ↑
                                       Admin Panel (port 3001) ←───────────────┘
                                       /login → JWT cookie
                                       /dashboard           → stats overview
                                       /dashboard/messages  → view + delete messages
                                       /dashboard/projects  → add + edit + delete projects
                                       /dashboard/skills    → add + edit + delete skills
```

---

## Admin Panel Features

### Dashboard (`/dashboard`)
- Stats cards: Total Messages, Total Projects, Skill Categories, System Status
- Recent messages preview
- Quick links to all sections

### Messages (`/dashboard/messages`)
- Full table of all contact form submissions
- Expandable rows to read full message
- Delete individual messages

### Projects (`/dashboard/projects`) — *Task 02*
- Table view of all portfolio projects with category badges and tags
- **Add** new project via slide-in drawer panel
- **Edit** any project (title, date, description bullets, tags, link, category, order)
- **Delete** project with confirmation

### Skills (`/dashboard/skills`) — *Task 02*
- Card view of all skill categories
- Expand any card to see individual skills with mini progress bars
- **Add** new skill category via slide-in drawer panel
- **Edit** categories and skills using pipe-delimited format (`Name | Level | Percentage`)
- **Delete** categories with confirmation

---

## Security

- Admin passwords are hashed with **bcrypt** (salt rounds: 12)
- JWT tokens are stored as **HTTP-only cookies** (not accessible via JavaScript)
- All `/dashboard/*` routes are protected by **Next.js proxy middleware** — unauthenticated users are redirected to `/login`
- Admin API routes (`/api/admin/*`) independently verify the JWT for double protection
- Cookies use `sameSite: strict` and `secure: true` in production

---

## Troubleshooting & Key Features

### 1. Auto-Seeding Default Data
On first launch, if the `projects` or `skillcategories` MongoDB collections are empty, the system automatically seeds them with the default portfolio data (6 projects and 6 skill categories). No manual database setup is required beyond creating an admin account.

### 2. Automated Local Fallback Database (`local-db.json`)
If you lose internet connectivity or your MongoDB Atlas instance goes offline, the system will **automatically and seamlessly fall back** to a shared local file database (`local-db.json` in the project root folder).

- All four collections (admins, contacts, projects, skillcategories) work in offline mode
- Local admin credentials are auto-seeded: `admin@example.com` / `admin`
- Once MongoDB becomes available again, restart the dev servers to reconnect

### 3. Built-in Global DNS Resolver
On some home or office networks, the router's DNS server fails to resolve MongoDB Atlas shard subdomains, throwing a `MongooseServerSelectionError`.

- The system patches `dns.lookup` to query **Google DNS (`8.8.8.8`)** and **Cloudflare DNS (`1.1.1.1`)** directly for `*.mongodb.net` hostnames
- This lets you connect to Atlas without changing any network settings

### 4. MongoDB Atlas IP Whitelisting
If you restrict Atlas access by IP:
1. Log into your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to **Security** → **Network Access**
3. Click **+ Add IP Address**
4. Choose **Add Current IP Address** and click **Confirm**
5. Wait for status to turn **Active**, then reload your application

---

## Development Notes

- Both apps use **Next.js App Router** with server components for data fetching
- The portfolio `/projects` and `/skills` pages are `force-dynamic` server components — they always render fresh data from the database
- The admin drawer UI uses a **slide-in side panel** pattern (not a modal) to ensure forms are never cut off on any screen size
- The admin panel's sidebar and header automatically detect the current route and update the active state and title accordingly
