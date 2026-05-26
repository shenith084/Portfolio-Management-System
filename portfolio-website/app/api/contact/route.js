import { connectDB, createMessage } from '@/lib/dbService';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const contact = await createMessage({ name, email, phone, message });

    return Response.json(
      { success: true, message: 'Message sent successfully!', data: contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return Response.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
