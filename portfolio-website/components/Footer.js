import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div className="footer-brand-name">
              <span className="footer-logo-bracket">&lt;</span>
              S<span className="footer-logo-accent">C</span>
              <span className="footer-logo-bracket">/&gt;</span>
            </div>
            <p className="footer-brand-desc">
              Shenith Chanidu Rashmika<br />
              BICT(Hons) Student &amp; AI/ML Engineer<br />
              Building the future, one line at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-col-heading">Navigation</p>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} id={`footer-${link.label.toLowerCase()}`} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="footer-col-heading">Connect</p>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/shenith-chanidu"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-linkedin"
                className="footer-social-item"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://shenith.neurostack.me"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-website"
                className="footer-social-item"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Portfolio
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {year} <span style={{ color: 'var(--color-teal)' }}>Shenith Chanidu Rashmika</span>. All rights reserved.
          </p>
          <p className="footer-copy">
            Built with <span style={{ color: 'var(--color-mint)' }}>Next.js</span> &amp; <span style={{ color: 'var(--color-mint)' }}>MongoDB</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
