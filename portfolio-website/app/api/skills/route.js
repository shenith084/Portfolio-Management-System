import { connectDB, getSkillCategories } from '@/lib/dbService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const skills = await getSkillCategories();
    return Response.json({ success: true, data: skills });
  } catch (error) {
    console.error('Skills GET Error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
