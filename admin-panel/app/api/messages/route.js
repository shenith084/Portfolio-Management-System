import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) throw new Error('Unauthorized');
  await jwtVerify(token, JWT_SECRET);
}

// GET — fetch all messages
export async function GET() {
  try {
    await verifyAuth();
    await connectDB();

    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return Response.json({ success: true, data: messages });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Messages GET Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — delete a message by id
export async function DELETE(request) {
  try {
    await verifyAuth();
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return Response.json({ success: false, error: 'Message ID is required.' }, { status: 400 });
    }

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ success: false, error: 'Message not found.' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Messages DELETE Error:', error);
    return Response.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
