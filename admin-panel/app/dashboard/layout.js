import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="admin-shell">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content area (offset by sidebar width) */}
      <div className="admin-main-area">
        {/* Sticky top header */}
        <Header />

        {/* Page content */}
        <main className="admin-content" id="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
