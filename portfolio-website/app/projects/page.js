import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | Projects',
  description: 'Browse my portfolio of projects — web apps, tools, and more.',
};

const projectsData = [
  {
    title: 'Brain Tumor Detection System using CNN & Transfer Learning',
    date: 'Jan 2026',
    description: [
      'Built a deep learning image classification model using MobileNetV2, TensorFlow, and Keras to detect brain tumors from MRI images.',
      'Developed a full-stack web application using React and Flask REST API for real-time tumor prediction and visualization.'
    ],
    link: '#'
  },
  {
    title: 'E-Commerce Platform',
    date: 'Dec 2025',
    description: [
      'Developed a full-stack e-commerce platform using Laravel, Bootstrap, CSS, and MySQL, integrating PayHere payment gateway and an admin dashboard for product and order management.'
    ],
    link: '#'
  },
  {
    title: 'AI-Based Mango Disease Detection System',
    date: 'Sep 2025',
    description: [
      'Developed a CNN-based computer vision model using TensorFlow/Keras to detect mango fruit diseases from images with automated classification.',
      'Built a full-stack web application using React and Flask, integrating an AI chatbot to provide disease diagnosis and treatment recommendations.'
    ],
    link: '#'
  },
  {
    title: 'IoT-Based Gas Leakage Detection System',
    date: 'May 2025',
    description: [
      'Developed an IoT-based gas leakage detection system using MQ-2 sensor, HX711 load cell, and Blynk, enabling real-time gas leak detection, cylinder weight monitoring, and instant mobile/email safety alerts.'
    ],
    link: '#'
  },
  {
    title: 'Freelancer Job Posting & Finding Platform',
    date: 'Dec 2024',
    description: [
      'Developed a job marketplace web platform using PHP and MySQL enabling clients to post jobs and freelancers to find opportunities.'
    ],
    link: '#'
  }
];

export default function ProjectsPage() {
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
            Here are some of the key projects I have worked on, showcasing my skills in Machine Learning, Full-Stack Development, and IoT.
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {projectsData.map((project, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 className="heading-3" style={{ fontSize: '1.25rem', lineHeight: '1.4', margin: 0 }}>{project.title}</h2>
              </div>
              <p className="text-teal" style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '16px' }}>{project.date}</p>
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, marginBottom: '24px', paddingLeft: '4px' }}>
                {project.description.map((desc, idx) => (
                  <li key={idx} className="body-text" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--color-teal)', marginTop: '2px' }}>▹</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              <div>
                <a href={project.link} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} target="_blank" rel="noopener noreferrer">
                  Repository Link
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
