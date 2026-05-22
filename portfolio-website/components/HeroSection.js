'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="page-container">
        <div className="hero-inner">

          {/* Text Content */}
          <div className="hero-content">
            <span className="badge">👋 Welcome to my Portfolio</span>
            <h1 className="hero-title">
              Hi, I&apos;m <span className="text-accent">Shenith Chanidu</span>
            </h1>
            <p className="hero-subtitle">
              BICT(Hons) Student &amp; AI/ML Enthusiast
            </p>
            <p className="hero-desc">
              I build modern web applications and AI solutions.
              Passionate about Software Development, Data Science, and creating
              things that make a real difference.
            </p>
            <div className="hero-actions">
              <Link href="/projects" id="hero-view-projects" className="btn-primary">
                View Projects
              </Link>
              <Link href="/contact" id="hero-contact" className="btn-outline">
                Contact Me
              </Link>
            </div>
          </div>

          {/* Avatar / Visual */}
          <div className="hero-avatar-wrap">
            <div className="hero-avatar" id="hero-avatar">
              <span className="hero-avatar-initials">SC</span>
            </div>
            <div className="hero-avatar-ring" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
