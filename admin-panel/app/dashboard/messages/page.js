import { connectDB, getAllMessages } from '@/lib/dbService';
import MessageTable from '@/components/MessageTable';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin | Messages',
  description: 'View and manage all contact form messages.',
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function getMessages() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) redirect('/login');
    await jwtVerify(token, JWT_SECRET);

    await connectDB();
    return await getAllMessages();
  } catch {
    redirect('/login');
  }
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-heading-1">Messages</h1>
          <p className="admin-body-text" style={{ marginTop: '6px' }}>
            All contact form submissions from your portfolio website.
          </p>
        </div>
        <span className="admin-badge" id="messages-count-badge">
          ✉️ {messages.length} {messages.length === 1 ? 'message' : 'messages'}
        </span>
      </div>

      {/* Messages Table */}
      <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
        <MessageTable initialMessages={messages} />
      </div>
    </div>
  );
}
