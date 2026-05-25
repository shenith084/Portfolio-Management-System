# Portfolio Management System

A full-stack portfolio management system with a public-facing portfolio website and a secure admin panel — built with Next.js, MongoDB, and JWT authentication.

## System Overview

| App | Port | Purpose |
|-----|------|---------|
| `portfolio-website` | 3000 | Public portfolio — Home, About, Projects, Skills, Contact |
| `admin-panel` | 3001 | Admin — login, view & manage contact messages |

Both apps share the same **MongoDB database** (`portfolio-management`).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 + CSS Variables |
| Database | MongoDB (via Mongoose) |
| Auth | JWT (via `jose`) + bcryptjs |
| Language | JavaScript |

---

## Project Structure

```
Portfolio-Management-System/
├── portfolio-website/           # Public-facing portfolio (port 3000)
│   ├── app/
│   │   ├── layout.js            # Root layout (Navbar + Footer)
│   │   ├── page.js              # Home Page
│   │   ├── about/page.js        # About Page
│   │   ├── projects/page.js     # Projects Page
│   │   ├── skills/page.js       # Skills Page (categorized + progress bars)
│   │   ├── contact/page.js      # Contact Page (info + form)
│   │   ├── globals.css          # Design system (CSS variables)
│   │   └── api/contact/route.js # Contact Form API → saves to MongoDB
│   ├── components/
│   │   ├── Navbar.js            # Responsive navigation with active states
│   │   ├── Footer.js            # Site footer with nav + social links
│   │   ├── HeroSection.js       # Animated typewriter hero
│   │   ├── ProjectCard.js       # Reusable project card
│   │   └── ContactForm.js       # Validated contact form with API integration
│   ├── lib/mongodb.js           # MongoDB connection (cached)
│   ├── models/Contact.js        # Contact Mongoose schema
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
    │   │   ├── page.js          # Dashboard stats + recent messages
    │   │   └── messages/page.js # Full messages table (view + delete)
    │   └── api/
    │       ├── login/route.js   # POST  — Login, issue JWT cookie
    │       ├── logout/route.js  # POST  — Clear JWT cookie
    │       └── messages/route.js# GET   — Fetch messages (auth required)
    │                             # DELETE— Delete message (auth required)
    ├── middleware.js             # Protect all /dashboard/* routes (JWT)
    ├── components/
    │   ├── Sidebar.js           # Branded sidebar with active links + logout
    │   ├── Header.js            # Admin header with user avatar
    │   └── MessageTable.js      # Dark-themed table with expandable rows + delete
    ├── lib/mongodb.js            # MongoDB connection (cached)
    ├── models/
    │   ├── Admin.js             # Admin schema (bcrypt password hashing)
    │   └── Contact.js           # Contact schema
    └── .env.local               # MONGODB_URI + JWT_SECRET
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
// For development you can use this Node.js one-liner to get a hash:
// node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourPassword', 12).then(h => console.log(h))"

db.admins.insertOne({
  name: "Shenith Chanidu",
  email: "admin@example.com",
  password: "<bcrypt-hash-of-your-password>",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

### 5. Database Collections

Both apps connect to the `portfolio-management` database:

**`admins`** — admin credentials (bcrypt-hashed password)

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Auto |
| name | String | Admin display name |
| email | String | Unique, lowercase |
| password | String | bcrypt-hashed |
| createdAt | Date | Auto |

**`contacts`** — messages submitted via the portfolio contact form

| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | Auto |
| name | String | Visitor full name |
| email | String | Visitor email |
| phone | String | Optional phone number |
| message | String | The message text |
| createdAt | Date | Auto |

---

## System Flow

```
Visitor → Portfolio Website (port 3000)
            └─ Contact Form → POST /api/contact → MongoDB (contacts collection)
                                                        ↑
                                       Admin Panel (port 3001) ←───────┘
                                       Login → /dashboard → View/Delete Messages
```

## Security

- Admin passwords are hashed with **bcrypt** (salt rounds: 12)
- JWT tokens are stored as **HTTP-only cookies** (not accessible via JavaScript)
- All `/dashboard/*` routes are protected by **Next.js middleware** — unauthenticated users are redirected to `/login`
- API routes independently verify the JWT for double protection
- Cookies use `sameSite: strict` and `secure: true` in production
