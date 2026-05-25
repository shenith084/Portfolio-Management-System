import HeroSection from '@/components/HeroSection';
import Link from 'next/link';

export const metadata = {
  title: 'Shenith Chanidu | Portfolio',
  description: 'Portfolio of Shenith Chanidu Rashmika — BICT(Hons) Student & AI/ML Enthusiast.',
};

const skills = [
  { name: 'JavaScript', icon: '⚡' },
  { name: 'Python', icon: '🐍' },
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Machine Learning', icon: '🤖' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'Git', icon: '📦' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* About Preview */}
      <section className="home-about-section">
        <div className="page-container">
          <div className="home-about-grid">
            <div className="home-about-text">
              <span className="badge">✦ About Me</span>
              <h2 className="heading-2" style={{ marginTop: '12px' }}>Who I Am</h2>
              <p className="body-text">
                I&apos;m <strong className="highlight-name">Shenith Chanidu Rashmika</strong>, a
                BICT(Hons) undergraduate with a passion for building modern web applications
                and AI/ML solutions. I turn ideas into real products with clean code and
                thoughtful design.
              </p>
              <p className="body-text" style={{ marginTop: '14px' }}>
                My focus areas include <span className="text-teal">Software Development</span>,{' '}
                <span className="text-teal">Data Science</span>, and{' '}
                <span className="text-accent">Artificial Intelligence</span>. Always learning,
                always building.
              </p>
              <div className="about-tag-row">
                {['AI / ML', 'Web Dev', 'Data Science', 'Open Source'].map((tag) => (
                  <span key={tag} className="about-tag">{tag}</span>
                ))}
              </div>
              <Link href="/about" id="home-learn-more" className="btn-outline" style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Learn More <span>→</span>
              </Link>
            </div>

            <div className="home-stats-grid">
              {[
                { num: '10+', label: 'Projects Built', icon: '🚀' },
                { num: '8+', label: 'Technologies', icon: '⚙️' },
                { num: '4+', label: 'Years Learning', icon: '📚' },
                { num: 'RUSL', label: 'BICT (Hons)', icon: '🎓' },
              ].map((s) => (
                <div className="stat-card" key={s.label} id={`stat-${s.label.replace(/\s+/g, '-').toLowerCase()}`}>
                  <span className="stat-icon">{s.icon}</span>
                  <span className="stat-number">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="home-skills-section">
        <div className="page-container">
          <div className="section-title-wrap">
            <span className="badge">✦ Skills</span>
            <h2 className="heading-2" style={{ marginTop: '12px' }}>What I Work With</h2>
            <p className="body-text" style={{ maxWidth: '500px', margin: '8px auto 0' }}>
              A curated set of tools and technologies I use to bring ideas to life.
            </p>
          </div>
          <div className="skills-chip-grid">
            {skills.map((skill) => (
              <span key={skill.name} className="skill-chip">
                <span className="skill-chip-icon">{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '36px' }}>
            <Link href="/skills" id="home-all-skills" className="btn-outline">View All Skills →</Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Teaser */}
      <section className="home-projects-teaser">
        <div className="page-container">
          <div className="section-title-wrap">
            <span className="badge">✦ Projects</span>
            <h2 className="heading-2" style={{ marginTop: '12px' }}>What I&apos;ve Built</h2>
          </div>
          <div className="projects-teaser-grid">
            {[
              {
                title: 'AI/ML Solutions',
                desc: 'Machine learning models and AI-powered tools built with Python, TensorFlow, and scikit-learn.',
                icon: '🤖',
                tags: ['Python', 'TensorFlow', 'ML'],
              },
              {
                title: 'Web Applications',
                desc: 'Full-stack web apps using React, Next.js, Node.js and MongoDB with clean UI and solid architecture.',
                icon: '🌐',
                tags: ['Next.js', 'Node.js', 'MongoDB'],
              },
              {
                title: 'Data Science',
                desc: 'Data analysis, visualization and prediction models leveraging pandas, numpy and matplotlib.',
                icon: '📊',
                tags: ['Python', 'Pandas', 'NumPy'],
              },
            ].map((p) => (
              <div key={p.title} className="teaser-card">
                <div className="teaser-card-icon">{p.icon}</div>
                <h3 className="teaser-card-title">{p.title}</h3>
                <p className="teaser-card-desc">{p.desc}</p>
                <div className="teaser-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-card-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '36px' }}>
            <Link href="/projects" id="home-all-projects" className="btn-primary">Browse All Projects →</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="home-cta-section">
        <div className="page-container">
          <div className="home-cta-box">
            <div className="cta-glow" aria-hidden="true" />
            <span className="badge">✦ Let&apos;s Connect</span>
            <h2 className="heading-2" style={{ marginTop: '16px' }}>Ready to Build Something Great?</h2>
            <p className="body-text" style={{ marginTop: '12px', marginBottom: '32px', maxWidth: '520px', margin: '12px auto 32px' }}>
              Have a project in mind or just want to say hi? I&apos;d love to hear from you.
            </p>
            <div className="cta-btn-row">
              <Link href="/contact" id="home-contact-cta" className="btn-primary">Get In Touch 📬</Link>
              <Link href="/projects" id="home-cta-projects" className="btn-outline">See My Work</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
