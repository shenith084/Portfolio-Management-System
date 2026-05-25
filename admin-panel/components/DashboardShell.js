'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main-area">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="admin-content" id="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
