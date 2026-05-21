export const metadata = {
  title: 'Admin | Login',
  description: 'Admin Panel Login',
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
        <p className="text-gray-400 text-center text-sm">Login form component goes here.</p>
      </div>
    </main>
  );
}
