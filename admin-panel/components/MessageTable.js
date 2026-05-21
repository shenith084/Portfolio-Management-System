'use client';

import { useState } from 'react';

export default function MessageTable({ initialMessages = [] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    setDeleting(id);

    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      } else {
        alert('Failed to delete message.');
      }
    } catch {
      alert('An error occurred while deleting.');
    } finally {
      setDeleting(null);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-lg">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Message</th>
            <th className="px-4 py-3">Received</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {messages.map((msg) => (
            <tr key={msg._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800">{msg.name}</td>
              <td className="px-4 py-3 text-indigo-600">{msg.email}</td>
              <td className="px-4 py-3">{msg.phone || '—'}</td>
              <td className="px-4 py-3 max-w-xs truncate" title={msg.message}>
                {msg.message}
              </td>
              <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                {new Date(msg.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  id={`delete-msg-${msg._id}`}
                  onClick={() => handleDelete(msg._id)}
                  disabled={deleting === msg._id}
                  className="text-red-500 hover:text-red-700 font-semibold text-xs disabled:opacity-50 transition-colors"
                >
                  {deleting === msg._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
