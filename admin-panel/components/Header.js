export default function Header({ title = 'Admin Panel' }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between ml-64">
      <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
          A
        </div>
        <span className="text-sm text-gray-600 font-medium">Admin</span>
      </div>
    </header>
  );
}
