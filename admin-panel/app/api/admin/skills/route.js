import { connectDB, getAllSkillCategories, createSkillCategory, updateSkillCategory, deleteSkillCategory } from '@/lib/dbService';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) throw new Error('Unauthorized');
  await jwtVerify(token, JWT_SECRET);
}

// GET — fetch all skill categories
export async function GET() {
  try {
    await verifyAuth();
    await connectDB();
    const categories = await getAllSkillCategories();
    return Response.json({ success: true, data: categories });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Skills GET Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST — create a new skill category
export async function POST(request) {
  try {
    await verifyAuth();
    await connectDB();

    const body = await request.json();
    const { categoryTitle, icon, order, skills } = body;

    if (!categoryTitle || !icon) {
      return Response.json(
        { success: false, error: 'Category title and icon are required.' },
        { status: 400 }
      );
    }

    const category = await createSkillCategory({ categoryTitle, icon, order: order || 0, skills: skills || [] });
    return Response.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Skills POST Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT — update a skill category by id
export async function PUT(request) {
  try {
    await verifyAuth();
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return Response.json({ success: false, error: 'Skill Category ID is required.' }, { status: 400 });
    }

    const body = await request.json();
    const updated = await updateSkillCategory(id, body);
    if (!updated) {
      return Response.json({ success: false, error: 'Skill category not found.' }, { status: 404 });
    }

    return Response.json({ success: true, data: updated });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Skills PUT Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — delete a skill category by id
export async function DELETE(request) {
  try {
    await verifyAuth();
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return Response.json({ success: false, error: 'Skill Category ID is required.' }, { status: 400 });
    }

    const deleted = await deleteSkillCategory(id);
    if (!deleted) {
      return Response.json({ success: false, error: 'Skill category not found.' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Skill category deleted successfully.' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Skills DELETE Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
