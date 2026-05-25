'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠', exact: true },
  { href: '/dashboard/messages', label: 'Messages', icon: '✉️', exact: false },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
    } finally {
      router.push('/login');
    }
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <span className="login-logo-bracket">&lt;</span>
          S<span className="login-logo-accent">C</span>
          <span className="login-logo-bracket">/&gt;</span>
        </div>
        <p className="sidebar-brand-sub">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" role="navigation" aria-label="Admin navigation">
        <p className="sidebar-section-label">Main Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            id={`sidebar-${item.label.toLowerCase()}`}
            className={`sidebar-nav-link${isActive(item) ? ' active' : ''}`}
            onClick={onClose}
          >
            <span className="sidebar-nav-icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button
          id="sidebar-logout"
          onClick={handleLogout}
          disabled={loggingOut}
          className="sidebar-logout-btn"
          aria-label="Logout from admin panel"
        >
          <span aria-hidden="true">{loggingOut ? '⏳' : '🚪'}</span>
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </aside>
  );
}
