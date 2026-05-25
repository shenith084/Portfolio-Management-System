import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Portfolio | Contact',
  description: 'Get in touch with Shenith Chanidu — send a message and I will get back to you soon.',
};

export default function ContactPage() {
  return (
    <main className="page-section">
      <div className="page-container">

        {/* Page Heading */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge">✦ Get In Touch</span>
          <h1 className="heading-1" style={{ marginTop: '12px' }}>
            Contact <span className="text-accent">Me</span>
          </h1>
          <p className="body-text" style={{ maxWidth: '560px', margin: '20px auto 0' }}>
            Have a project in mind, a question, or just want to say hello? Fill out the form and
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid">

          {/* Left — Contact Info */}
          <div className="contact-info">

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">📧</div>
              <div>
                <p className="contact-info-label">Email</p>
                <a
                  href="mailto:shenithchanidu@gmail.com"
                  className="contact-info-value"
                  style={{ textDecoration: 'none', transition: 'color 0.2s' }}
                >
                  shenithchanidu@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">📍</div>
              <div>
                <p className="contact-info-label">Location</p>
                <p className="contact-info-value">Sri Lanka 🇱🇰</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">🎓</div>
              <div>
                <p className="contact-info-label">University</p>
                <p className="contact-info-value">Rajarata University of Sri Lanka</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">⚡</div>
              <div>
                <p className="contact-info-label">Status</p>
                <p className="contact-info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--color-mint)',
                      boxShadow: '0 0 8px var(--color-mint)',
                      animation: 'pulse-status 2s infinite',
                    }}
                  />
                  Open to opportunities
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '8px' }}>
              <p className="contact-info-label" style={{ marginBottom: '14px' }}>Connect</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="https://github.com/shenith084"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github"
                  className="contact-social-btn"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shenith-chanidu"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin"
                  className="contact-social-btn"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="contact-form-wrap">
            <h2 className="heading-3" style={{ marginBottom: '24px', color: 'var(--foreground)' }}>
              Send a Message
            </h2>
            <ContactForm />
          </div>

        </div>
      </div>
    </main>
  );
}
