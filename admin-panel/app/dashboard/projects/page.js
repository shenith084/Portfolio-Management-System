import { connectDB, getAllProjects } from '@/lib/dbService';
import ProjectTable from '@/components/ProjectTable';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin | Projects',
  description: 'View and manage all portfolio projects.',
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function getProjects() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) redirect('/login');
    await jwtVerify(token, JWT_SECRET);

    await connectDB();
    return await getAllProjects();
  } catch {
    redirect('/login');
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-heading-1">Projects</h1>
          <p className="admin-body-text" style={{ marginTop: '6px' }}>
            Manage the projects displayed on your portfolio website.
          </p>
        </div>
        <span className="admin-badge" id="projects-count-badge">
          🚀 {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      {/* Projects Table */}
      <div className="admin-card">
        <ProjectTable initialProjects={projects} />
      </div>
    </div>
  );
}
