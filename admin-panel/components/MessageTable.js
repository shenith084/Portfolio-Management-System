'use client';

import React, { useState } from 'react';

export default function MessageTable({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [deleting, setDeleting] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Delete this message? This action cannot be undone.')) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (expandedId === id) setExpandedId(null);
      } else {
        alert('Failed to delete message. Please try again.');
      }
    } catch {
      alert('Connection error while deleting message.');
    } finally {
      setDeleting(null);
    }
  };

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  if (messages.length === 0) {
    return (
      <div className="msg-empty">
        <div className="msg-empty-icon">📭</div>
        <p className="msg-empty-text">No messages yet.</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          When visitors submit your contact form, they&apos;ll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="msg-table-wrap">
      <table className="msg-table" aria-label="Contact messages">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Message</th>
            <th scope="col">Received</th>
            <th scope="col" style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <React.Fragment key={msg._id}>
              <tr>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{index + 1}</td>
                <td className="msg-td-name">{msg.name}</td>
                <td className="msg-td-email">
                  <a href={`mailto:${msg.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {msg.email}
                  </a>
                </td>
                <td className="msg-td-phone">{msg.phone || '—'}</td>
                <td
                  className="msg-td-msg"
                  onClick={() => toggleExpand(msg._id)}
                  title="Click to expand"
                  style={{ cursor: 'pointer' }}
                >
                  {expandedId === msg._id ? '' : msg.message}
                  {expandedId !== msg._id && (
                    <span style={{ color: 'var(--color-teal)', fontSize: '0.75rem', marginLeft: '6px' }}>
                      {msg.message.length > 50 ? '↕ expand' : ''}
                    </span>
                  )}
                </td>
                <td className="msg-td-date">
                  {new Date(msg.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    id={`delete-msg-${msg._id}`}
                    onClick={() => handleDelete(msg._id)}
                    disabled={deleting === msg._id}
                    className="btn-danger"
                    aria-label={`Delete message from ${msg.name}`}
                  >
                    {deleting === msg._id ? (
                      <>⏳ Deleting</>
                    ) : (
                      <>🗑️ Delete</>
                    )}
                  </button>
                </td>
              </tr>
              {/* Expanded message row */}
              {expandedId === msg._id && (
                <tr key={`${msg._id}-expanded`} style={{ background: 'rgba(9,60,93,0.3)' }}>
                  <td colSpan={7} style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                      {msg.message}
                    </p>
                    <button
                      onClick={() => setExpandedId(null)}
                      style={{
                        marginTop: '10px',
                        fontSize: '0.78rem',
                        color: 'var(--color-teal)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      ↑ Collapse
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
