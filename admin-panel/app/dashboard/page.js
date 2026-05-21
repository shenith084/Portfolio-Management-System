export const metadata = {
  title: 'Admin | Dashboard',
  description: 'Admin Dashboard Home',
};

export default function DashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-gray-500">Welcome to the admin dashboard. Use the sidebar to navigate.</p>
    </main>
  );
}
