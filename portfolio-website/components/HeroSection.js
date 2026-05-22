'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const ROLES = [
  'a BICT(Hons) Student',
  'an AI / ML Engineer',
  'a Software Developer'

];

const TYPING_SPEED = 65;   // ms per char when typing
const DELETING_SPEED = 35;   // ms per char when deleting
const PAUSE_AFTER = 1800; // ms pause after fully typed
const PAUSE_BEFORE = 400;  // ms pause before next word starts

function useTypewriter(words) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'deleting' | 'waiting'
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const current = words[idx];

    if (phase === 'typing') {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPING_SPEED);
        return () => clearTimeout(t);
      } else {
        // Done typing → pause
        const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const t = setTimeout(() => setText((s) => s.slice(0, -1)), DELETING_SPEED);
        return () => clearTimeout(t);
      } else {
        // Done deleting → wait then move to next
        const t = setTimeout(() => {
          setIdx((i) => (i + 1) % words.length);
          setPhase('typing');
        }, PAUSE_BEFORE);
        return () => clearTimeout(t);
      }
    }
  }, [text, phase, idx, words]);

  return text;
}

export default function HeroSection() {
  const role = useTypewriter(ROLES);

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

            {/* Typewriter subtitle */}
            <p className="hero-subtitle typewriter-line">
              I&apos;m&nbsp;
              <span className="typewriter-text">{role}</span>
              <span className="typewriter-cursor" aria-hidden="true">|</span>
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

              <Link href="https://github.com/shenith084" target="_blank" rel="noopener noreferrer" className="social-btn social-btn-github" aria-label="GitHub">
                <FiGithub className="icon" />
                <span className="outer-ring"></span>
              </Link>
              <Link href="https://www.linkedin.com/in/shenith-chanidu" target="_blank" rel="noopener noreferrer" className="social-btn social-btn-linkedin" aria-label="LinkedIn">
                <FiLinkedin className="icon" />
                <span className="outer-ring"></span>
              </Link>
            </div>
          </div>

          {/* Avatar / Visual */}
          <div className="hero-avatar-wrap">
            <div className="hero-avatar" id="hero-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt="Shenith Chanidu"
                className="hero-avatar-photo"
              />
            </div>
            <div className="hero-avatar-ring" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
