import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/dashboard/messages', label: 'Messages', icon: '✉️' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col py-8 px-4 fixed left-0 top-0">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-indigo-400">Admin Panel</h2>
        <p className="text-gray-500 text-xs mt-1">Portfolio Management</p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors font-medium"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <form action="/api/logout" method="POST">
          <button
            id="sidebar-logout"
            type="submit"
            className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-colors font-medium"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
