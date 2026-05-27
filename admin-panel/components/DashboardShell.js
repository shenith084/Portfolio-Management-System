'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine title and icon based on route
  let headerTitle = 'Dashboard';
  let headerIcon = '🏠';

  if (pathname.startsWith('/dashboard/messages')) {
    headerTitle = 'Messages';
    headerIcon = '✉️';
  } else if (pathname.startsWith('/dashboard/projects')) {
    headerTitle = 'Projects';
    headerIcon = '🚀';
  } else if (pathname.startsWith('/dashboard/skills')) {
    headerTitle = 'Skills';
    headerIcon = '⚙️';
  }

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
        <Header 
          title={headerTitle} 
          icon={headerIcon} 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <main className="admin-content" id="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
