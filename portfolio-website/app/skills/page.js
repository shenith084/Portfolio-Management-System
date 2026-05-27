import { connectDB, getSkillCategories } from '@/lib/dbService';

export const metadata = {
  title: 'Portfolio | Skills',
  description: 'A look at my technical skills, tools, and technologies — from web development to AI/ML.',
};

export const dynamic = 'force-dynamic';

const levelColors = {
  Advanced:     'var(--color-mint)',
  Intermediate: 'var(--color-teal)',
  Beginner:     'var(--color-steel)',
};

export default async function SkillsPage() {
  let skillCategories = [];
  try {
    await connectDB();
    skillCategories = await getSkillCategories();
  } catch {
    skillCategories = [];
  }

  return (
    <main className="page-section">
      <div className="page-container">

        {/* Page Heading */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="badge">✦ My Skills</span>
          <h1 className="heading-1" style={{ marginTop: '12px' }}>
            What I <span className="text-accent">Know</span>
          </h1>
          <p className="body-text" style={{ maxWidth: '560px', margin: '20px auto 0' }}>
            A curated overview of my technical expertise across frontend, backend, AI/ML, databases, and tooling —
            built through coursework, personal projects, and continuous learning.
          </p>
        </div>

        {/* Skill Level Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '56px' }}>
          {[['Advanced', 'var(--color-mint)'], ['Intermediate', 'var(--color-teal)'], ['Beginner', 'var(--color-steel)']].map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '3px', background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        {skillCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem' }}>No skill data found. Check back soon!</p>
          </div>
        ) : (
          <div className="skills-category-grid">
            {skillCategories.map((cat) => (
              <div key={cat._id} className="skill-category-card">
                <h2 className="skill-category-title">
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.categoryTitle}
                </h2>
                <div className="skill-list">
                  {cat.skills.map((skill, idx) => (
                    <div key={idx} className="skill-row">
                      <div className="skill-name-row">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level-label" style={{ color: levelColors[skill.level] }}>
                          {skill.level}
                        </span>
                      </div>
                      <div
                        className="skill-bar"
                        role="progressbar"
                        aria-valuenow={skill.pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={skill.name}
                      >
                        <div
                          className="skill-bar-inner"
                          style={{
                            width: `${skill.pct}%`,
                            background: `linear-gradient(90deg, var(--color-steel), ${levelColors[skill.level]})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Currently Learning */}
        <div
          style={{
            marginTop: '64px',
            padding: '36px 40px',
            background: 'linear-gradient(135deg, rgba(9,60,93,0.6) 0%, rgba(59,117,151,0.25) 100%)',
            border: '1px solid rgba(111,209,215,0.25)',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <span className="badge" style={{ marginBottom: '16px' }}>🚀 Always Growing</span>
          <h2 className="heading-2">Currently Exploring</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            {[
              'LangChain & LLM Agents',
              'Docker & Kubernetes',
              'System Design',
              'TypeScript',
              'Generative AI',
              'AWS Fundamentals',
            ].map((item) => (
              <span key={item} className="skill-chip">
                <span className="skill-chip-icon">⭐</span>
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
