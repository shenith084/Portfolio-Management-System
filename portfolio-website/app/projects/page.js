import { connectDB, getProjects } from '@/lib/dbService';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | Projects',
  description: 'Browse my portfolio of projects — web apps, AI/ML tools, and more.',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projectsData = [];
  try {
    await connectDB();
    projectsData = await getProjects();
  } catch {
    projectsData = [];
  }

  return (
    <main className="page-section">
      <div className="page-container">

        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="badge">✦ Portfolio</span>
          <h1 className="heading-1" style={{ marginTop: '12px' }}>
            Featured <span className="text-accent">Projects</span>
          </h1>
          <p className="body-text" style={{ maxWidth: '600px', margin: '20px auto 0' }}>
            Here are some of the key projects I have worked on, showcasing my skills in
            Machine Learning, Full-Stack Development, and IoT.
          </p>
        </div>

        {/* Projects Grid */}
        {projectsData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1rem' }}>No projects found. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {projectsData.map((project) => (
              <div key={project._id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '12px' }}>
                  <h2 className="heading-3" style={{ fontSize: '1.1rem', lineHeight: '1.4', margin: 0 }}>
                    {project.title}
                  </h2>
                </div>
                <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.8rem', marginBottom: '12px' }}>
                  {project.date}
                </p>
                <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1, marginBottom: '20px', paddingLeft: '4px' }}>
                  {project.description.map((desc, idx) => (
                    <li key={idx} className="body-text" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.5' }}>
                      <span style={{ color: 'var(--color-teal)', marginTop: '2px' }}>▹</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-card-tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div>
                  <a
                    href={project.link || '#'}
                    className="btn-outline"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
