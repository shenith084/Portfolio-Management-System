export default function Header({ title = 'Dashboard', icon = '🏠' }) {
  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <span className="admin-header-title-icon" aria-hidden="true">{icon}</span>
        {title}
      </div>
      <div className="admin-header-right">
        <span className="admin-header-name">Admin</span>
        <div className="admin-avatar" aria-label="Admin user">A</div>
      </div>
    </header>
  );
}
