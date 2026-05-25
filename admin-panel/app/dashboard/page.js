import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin | Dashboard',
  description: 'Portfolio admin dashboard — overview and quick links.',
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function getStats() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) redirect('/login');
    await jwtVerify(token, JWT_SECRET);

    await connectDB();
    const totalMessages = await Contact.countDocuments();
    const recentMessages = await Contact.find({}).sort({ createdAt: -1 }).limit(3);
    return { totalMessages, recentMessages };
  } catch {
    redirect('/login');
  }
}

export default async function DashboardPage() {
  const { totalMessages, recentMessages } = await getStats();

  return (
    <div>
      {/* Page title */}
      <div style={{ marginBottom: '28px' }}>
        <h1 className="admin-heading-1">Dashboard</h1>
        <p className="admin-body-text" style={{ marginTop: '6px' }}>
          Welcome back, Admin. Here&apos;s an overview of your portfolio activity.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">✉️</div>
          <div className="stat-card-value">{totalMessages}</div>
          <div className="stat-card-label">Total Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📬</div>
          <div className="stat-card-value">{recentMessages.length}</div>
          <div className="stat-card-label">Recent (Last 3)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🟢</div>
          <div className="stat-card-value" style={{ fontSize: '1.3rem' }}>Live</div>
          <div className="stat-card-label">System Status</div>
        </div>
      </div>

      {/* Recent Messages Preview */}
      <div className="admin-card" style={{ marginBottom: '24px' }}>
        <div className="admin-card-header">
          <h2 className="admin-heading-2">Recent Messages</h2>
          <Link href="/dashboard/messages" id="dashboard-view-all" className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            View All →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="msg-empty" style={{ padding: '32px' }}>
            <div className="msg-empty-icon">📭</div>
            <p className="msg-empty-text" style={{ fontSize: '0.9rem' }}>No messages yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentMessages.map((msg) => (
              <div
                key={msg._id.toString()}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: 'rgba(59,117,151,0.08)',
                  border: '1px solid rgba(26,86,122,0.4)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: 'var(--foreground)', marginBottom: '2px', fontSize: '0.9rem' }}>
                      {msg.name}
                    </p>
                    <p style={{ color: 'var(--color-teal)', fontSize: '0.8rem', marginBottom: '6px' }}>
                      {msg.email}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.message}
                    </p>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-heading-2">Quick Links</h2>
        </div>
        <div className="quick-links-grid">
          <Link href="/dashboard/messages" id="quick-messages" className="quick-link-tile">
            <span className="quick-link-icon">✉️</span>
            All Messages
          </Link>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            id="quick-portfolio"
            className="quick-link-tile"
          >
            <span className="quick-link-icon">🌐</span>
            View Portfolio
          </a>
          <a
            href="https://github.com/shenith084"
            target="_blank"
            rel="noopener noreferrer"
            id="quick-github"
            className="quick-link-tile"
          >
            <span className="quick-link-icon">📦</span>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
