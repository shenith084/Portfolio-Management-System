export const metadata = {
  title: 'Portfolio | Skills',
  description: 'A look at my technical skills, tools, and technologies — from web development to AI/ML.',
};

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    skills: [
      { name: 'HTML & CSS', level: 'Advanced', pct: 92 },
      { name: 'JavaScript (ES6+)', level: 'Advanced', pct: 88 },
      { name: 'React.js', level: 'Advanced', pct: 85 },
      { name: 'Next.js', level: 'Intermediate', pct: 80 },
      { name: 'Tailwind CSS', level: 'Advanced', pct: 85 },
      { name: 'Bootstrap', level: 'Advanced', pct: 88 },
    ],
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 'Intermediate', pct: 78 },
      { name: 'Next.js API Routes', level: 'Intermediate', pct: 76 },
      { name: 'PHP', level: 'Intermediate', pct: 72 },
      { name: 'Laravel', level: 'Intermediate', pct: 70 },
      { name: 'Flask (Python)', level: 'Intermediate', pct: 75 },
      { name: 'REST API Design', level: 'Intermediate', pct: 78 },
    ],
  },
  {
    title: 'AI / Machine Learning',
    icon: '🤖',
    skills: [
      { name: 'Python', level: 'Advanced', pct: 90 },
      { name: 'TensorFlow / Keras', level: 'Intermediate', pct: 78 },
      { name: 'scikit-learn', level: 'Intermediate', pct: 75 },
      { name: 'Computer Vision (CV2)', level: 'Intermediate', pct: 73 },
      { name: 'Pandas & NumPy', level: 'Advanced', pct: 85 },
      { name: 'Matplotlib / Seaborn', level: 'Advanced', pct: 82 },
    ],
  },
  {
    title: 'Database & Cloud',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB', level: 'Intermediate', pct: 76 },
      { name: 'MySQL', level: 'Advanced', pct: 82 },
      { name: 'Mongoose ODM', level: 'Intermediate', pct: 74 },
      { name: 'Firebase', level: 'Beginner', pct: 55 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', pct: 88 },
      { name: 'VS Code', level: 'Advanced', pct: 95 },
      { name: 'Jupyter Notebook', level: 'Advanced', pct: 90 },
      { name: 'Postman', level: 'Intermediate', pct: 78 },
      { name: 'Docker (Basics)', level: 'Beginner', pct: 50 },
    ],
  },
  {
    title: 'Soft Skills',
    icon: '💡',
    skills: [
      { name: 'Problem Solving', level: 'Advanced', pct: 90 },
      { name: 'Team Collaboration', level: 'Advanced', pct: 88 },
      { name: 'Project Leadership', level: 'Intermediate', pct: 80 },
      { name: 'Technical Writing', level: 'Intermediate', pct: 76 },
    ],
  },
];

const levelColors = {
  Advanced:     'var(--color-mint)',
  Intermediate: 'var(--color-teal)',
  Beginner:     'var(--color-steel)',
};

export default function SkillsPage() {
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
        <div className="skills-category-grid">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-category-card">
              <h2 className="skill-category-title">
                <span aria-hidden="true">{cat.icon}</span>
                {cat.title}
              </h2>
              <div className="skill-list">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-name-row">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level-label" style={{ color: levelColors[skill.level] }}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="skill-bar" role="progressbar" aria-valuenow={skill.pct} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
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
