'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" id="navbar-logo" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>
          S<span className="logo-accent">C</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className={`nav-link${pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link href="/contact" id="navbar-hire" className="navbar-cta">
          Hire Me
        </Link>

        {/* Mobile Toggle */}
        <button
          id="navbar-toggle"
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`toggle-bar${menuOpen ? ' open-1' : ''}`} />
          <span className={`toggle-bar${menuOpen ? ' open-2' : ''}`} />
          <span className={`toggle-bar${menuOpen ? ' open-3' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            id={`nav-mobile-${link.label.toLowerCase()}`}
            className={`mobile-nav-link${pathname === link.href ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          id="nav-mobile-hire"
          className="btn-primary"
          style={{ marginTop: '8px', textAlign: 'center', justifyContent: 'center' }}
          onClick={() => setMenuOpen(false)}
        >
          Hire Me
        </Link>
      </div>
    </header>
  );
}
