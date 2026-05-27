import { connectDB, getAllProjects, createProject, updateProject, deleteProject } from '@/lib/dbService';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) throw new Error('Unauthorized');
  await jwtVerify(token, JWT_SECRET);
}

// GET — fetch all projects
export async function GET() {
  try {
    await verifyAuth();
    await connectDB();
    const projects = await getAllProjects();
    return Response.json({ success: true, data: projects });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Projects GET Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST — create a new project
export async function POST(request) {
  try {
    await verifyAuth();
    await connectDB();

    const body = await request.json();
    const { title, date, description, tags, link, category, order } = body;

    if (!title || !date || !description || description.length === 0) {
      return Response.json(
        { success: false, error: 'Title, date, and at least one description bullet are required.' },
        { status: 400 }
      );
    }

    const project = await createProject({ title, date, description, tags, link, category, order });
    return Response.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Projects POST Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT — update a project by id
export async function PUT(request) {
  try {
    await verifyAuth();
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return Response.json({ success: false, error: 'Project ID is required.' }, { status: 400 });
    }

    const body = await request.json();
    const updated = await updateProject(id, body);
    if (!updated) {
      return Response.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    return Response.json({ success: true, data: updated });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Projects PUT Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — delete a project by id
export async function DELETE(request) {
  try {
    await verifyAuth();
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return Response.json({ success: false, error: 'Project ID is required.' }, { status: 400 });
    }

    const deleted = await deleteProject(id);
    if (!deleted) {
      return Response.json({ success: false, error: 'Project not found.' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Projects DELETE Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
