import HeroSection from '@/components/HeroSection';
import Link from 'next/link';

export const metadata = {
  title: 'Shenith Chanidu | Portfolio',
  description: 'Portfolio of Shenith Chanidu Rashmika — BICT(Hons) Student & AI/ML Enthusiast.',
};

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
              <span className="badge">About Me</span>
              <h2 className="heading-2">Who I Am</h2>
              <p className="body-text">
                I&apos;m <strong style={{ color: 'var(--color-teal)' }}>Shenith Chanidu Rashmika</strong>, a
                BICT(Hons) undergraduate student with a passion for building modern web applications
                and AI/ML solutions. I enjoy turning ideas into real products using clean code and
                thoughtful design.
              </p>
              <p className="body-text" style={{ marginTop: '12px' }}>
                My focus areas include Software Development, Data Science, and Artificial Intelligence.
                I am always learning and working on projects that challenge and grow my skills.
              </p>
              <Link href="/about" id="home-learn-more" className="btn-outline" style={{ marginTop: '24px', display: 'inline-block' }}>
                Learn More About Me →
              </Link>
            </div>

            <div className="home-stats-grid">
              <div className="stat-card" id="stat-projects">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card" id="stat-skills">
                <span className="stat-number">8+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-card" id="stat-experience">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Learning</span>
              </div>
              <div className="stat-card" id="stat-degree">
                <span className="stat-number">BSc</span>
                <span className="stat-label">BICT (Hons)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="home-skills-section">
        <div className="page-container">
          <div className="section-title-wrap">
            <span className="badge">Skills</span>
            <h2 className="heading-2">What I Work With</h2>
          </div>
          <div className="skills-chip-grid">
            {['JavaScript', 'Python', 'Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Machine Learning', 'Git', 'REST APIs'].map((skill) => (
              <span key={skill} className="skill-chip">{skill}</span>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '32px' }}>
            <Link href="/skills" id="home-all-skills" className="btn-outline">View All Skills →</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="home-cta-section">
        <div className="page-container">
          <div className="home-cta-box">
            <h2 className="heading-2">Let&apos;s Work Together</h2>
            <p className="body-text" style={{ marginTop: '12px', marginBottom: '28px' }}>
              Have a project in mind? I&apos;d love to hear from you. Send me a message and let&apos;s build something great.
            </p>
            <Link href="/contact" id="home-contact-cta" className="btn-primary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
