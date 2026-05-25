export default function Header({ title = 'Dashboard', icon = '🏠', onMenuClick }) {
  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <button 
          className="admin-mobile-menu-btn" 
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
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
