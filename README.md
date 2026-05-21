# Portfolio Management System

A full-stack portfolio management system with a public-facing portfolio website and a secure admin panel.

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
| Styling | Tailwind CSS 4 |
| Database | MongoDB (via Mongoose) |
| Auth | JWT (via `jose`) + bcryptjs |
| Language | JavaScript |

---

## Project Structure

```
Portfolio-Management-System/
├── portfolio-website/           # Public-facing portfolio (port 3000)
│   ├── app/
│   │   ├── page.js              # Home Page
│   │   ├── about/page.js        # About Page
│   │   ├── projects/page.js     # Projects Page
│   │   ├── skills/page.js       # Skills Page
│   │   ├── contact/page.js      # Contact Page
│   │   └── api/contact/route.js # Contact Form API
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── HeroSection.js
│   │   ├── ProjectCard.js
│   │   └── ContactForm.js
│   ├── lib/mongodb.js           # MongoDB Connection
│   ├── models/Contact.js        # Contact Schema
│   └── .env.local               # MONGODB_URI
│
└── admin-panel/                 # Admin Dashboard (port 3001)
    ├── app/
    │   ├── login/page.js        # Admin Login Page
    │   ├── dashboard/
    │   │   ├── page.js          # Dashboard Home
    │   │   └── messages/page.js # View All Messages
    │   └── api/
    │       ├── login/route.js   # Login API (JWT)
    │       └── messages/route.js# Get/Delete Messages
    ├── components/
    │   ├── Sidebar.js
    │   ├── Header.js
    │   └── MessageTable.js
    ├── lib/mongodb.js            # MongoDB Connection
    ├── models/
    │   ├── Admin.js             # Admin Schema (bcrypt)
    │   └── Contact.js           # Contact Schema
    ├── middleware.js             # Protect Admin Routes (JWT)
    └── .env.local               # MONGODB_URI + JWT_SECRET
```

---

## Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas connection string

### 2. Setup Portfolio Website
```bash
cd portfolio-website
# Edit .env.local with your MongoDB URI
npm run dev        # Runs on http://localhost:3000
```

### 3. Setup Admin Panel
```bash
cd admin-panel
# Edit .env.local with your MongoDB URI and a strong JWT_SECRET
npm run dev        # Runs on http://localhost:3001
```

### 4. Database

Both apps connect to the same MongoDB database `portfolio-management` with two collections:

**`admins`** — admin credentials (password is bcrypt-hashed)

| Field | Type |
|-------|------|
| _id | ObjectId |
| name | String |
| email | String (Unique) |
| password | String (Hashed) |
| createdAt | Date |

**`contacts`** — messages from the contact form

| Field | Type |
|-------|------|
| _id | ObjectId |
| name | String |
| email | String |
| phone | String |
| message | String |
| createdAt | Date |

---

## System Flow

```
Visitor → Portfolio Website → Contact Form → API Route → MongoDB
                                                              ↑
                                             Admin Panel ←───┘
                                          (Login · View · Delete)
```
