import { connectDB, getProjects } from '@/lib/dbService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const projects = await getProjects();
    return Response.json({ success: true, data: projects });
  } catch (error) {
    console.error('Projects GET Error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
