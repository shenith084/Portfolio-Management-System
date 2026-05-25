import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | About',
  description: 'Learn more about me — my background, experience, and passions.',
};

export default function AboutPage() {
  return (
    <main className="page-section">
      <div className="page-container">
        
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge">✦ About Me</span>
          <h1 className="heading-1" style={{ marginTop: '12px' }}>
            Who <span className="text-accent">I Am</span>
          </h1>
          <p className="body-text" style={{ maxWidth: '800px', margin: '20px auto 0' }}>
            Throughout my academic journey, I have gained in-depth knowledge and hands-on experience in Artificial Intelligence and Machine Learning, equipping me with the technical expertise to architect intelligent systems and data-driven solutions. I am eager to apply my skills in Computer Vision and Deep Learning to real world projects and contribute to high impact, innovative technology. I am seeking opportunities to apply my technical expertise in a dynamic environment where I can contribute effectively and grow as an AI/ML Engineer.
          </p>
        </div>

        {/* Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          
          {/* Education */}
          <div className="card" style={{ padding: '16px' }}>
            <h2 className="heading-2" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Education</h2>
            <div>
              <h3 className="heading-3" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>Bachelor of Information Communication Technology BICT(Hons)</h3>
              <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.8rem', marginBottom: '6px' }}>Rajarata University of Sri Lanka • Expected Graduation 2027</p>
              <p className="body-text" style={{ fontSize: '0.85rem', marginBottom: '4px' }}><strong>Current GPA:</strong> 3.31</p>
              <p className="body-text" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}><strong>Relevant coursework:</strong> Data Structures and Algorithms, Object-Oriented Programming, Database Systems, Web Development, Machine Learning, Design Patterns, Agile Practices</p>
            </div>
          </div>

          {/* Research */}
          <div className="card" style={{ padding: '16px' }}>
            <h2 className="heading-2" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Research</h2>
            <div>
              <h3 className="heading-3" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>Performance Enhancement of Sinhala Sign Language Detection Systems using Image Enhancement Techniques</h3>
              <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.8rem', marginBottom: '8px', marginTop: '6px' }}>Rajarata University of Sri Lanka • Dec 2025 – Present</p>
              <p className="body-text" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>Investigating computer vision to improve Sinhala Sign Language (SSL) detection accuracy, aiming to bridge communication barriers for the hearing-impaired community.</p>
            </div>
          </div>

          {/* Volunteer Experience */}
          <div className="card" style={{ padding: '16px' }}>
            <h2 className="heading-2" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Volunteer Experience</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              <li>
                <h3 className="heading-3" style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Project Lead</h3>
                <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.8rem' }}>ROST Rajarata - Robotic Society of Technology • 2024 – Present</p>
              </li>
              <li>
                <h3 className="heading-3" style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Project Lead</h3>
                <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.8rem' }}>ATIT Rajarata - Association of Technology IT • 2024 – Present</p>
              </li>
              <li>
                <h3 className="heading-3" style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Member</h3>
                <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.8rem' }}>ATIT Rajarata - Association of Technology IT • 2023 – Present</p>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Certifications */}
        <div className="card" style={{ padding: '20px' }}>
          <h2 className="heading-2" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {[
              { title: 'Career Essentials in Data Analysis', issuer: 'Microsoft and LinkedIn', date: 'Mar 2026' },
              { title: 'Deep Learning and Generative AI', issuer: 'LinkedIn', date: 'Feb 2026' },
              { title: 'What Is Generative AI', issuer: 'LinkedIn', date: 'Feb 2026' },
              { title: 'Introduction to DevOps Tools', issuer: 'Simplilearn', date: 'Jan 2026' },
              { title: 'Full-Stack Web Development', issuer: 'Find X (Pvt) Ltd', date: '2025-Pending' },
              { title: 'Web Design for Beginners', issuer: 'University of Moratuwa', date: 'Jul 2023' },
              { title: 'Python for Beginners', issuer: 'University of Moratuwa', date: 'Jun 2023' },
              { title: 'AI/ML Engineer - Stage 1 & 2', issuer: 'SLIIT', date: 'Jun 2023' }
            ].map((cert, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(59,117,151,0.1)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h4 style={{ color: 'var(--foreground)', fontWeight: '600', marginBottom: '2px', fontSize: '0.85rem' }}>{cert.title}</h4>
                <p style={{ color: 'var(--color-teal)', fontSize: '0.75rem', fontWeight: '500' }}>{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
