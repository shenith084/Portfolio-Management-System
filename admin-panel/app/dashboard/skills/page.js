import { connectDB, getAllSkillCategories } from '@/lib/dbService';
import SkillTable from '@/components/SkillTable';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin | Skills',
  description: 'View and manage all portfolio skill categories.',
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function getSkills() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) redirect('/login');
    await jwtVerify(token, JWT_SECRET);

    await connectDB();
    return await getAllSkillCategories();
  } catch {
    redirect('/login');
  }
}

export default async function SkillsPage() {
  const categories = await getSkills();

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-heading-1">Skills</h1>
          <p className="admin-body-text" style={{ marginTop: '6px' }}>
            Manage the skill categories and proficiency levels on your portfolio.
          </p>
        </div>
        <span className="admin-badge" id="skills-count-badge">
          ⚙️ {categories.length} {categories.length === 1 ? 'category' : 'categories'}
        </span>
      </div>

      {/* Skills Table */}
      <div className="admin-card">
        <SkillTable initialCategories={categories} />
      </div>
    </div>
  );
}
