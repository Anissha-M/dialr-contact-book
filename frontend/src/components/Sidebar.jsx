import React from 'react';

// Sidebar component for category and favorite navigation
function Sidebar({ activeFilter, onSelectFilter, counts }) {
  // Navigation categories list
  const navItems = [
    { id: 'All', label: 'All Contacts', icon: '👥', count: counts.total || 0 },
    { id: 'Favorites', label: 'Favorites', icon: '⭐', count: counts.favorites || 0 },
    { id: 'Work', label: 'Work', icon: '💼', count: counts.work || 0 },
    { id: 'Friends', label: 'Friends', icon: '🎉', count: counts.friends || 0 },
    { id: 'Family', label: 'Family', icon: '🏠', count: counts.family || 0 },
    { id: 'Other', label: 'Other', icon: '📌', count: counts.other || 0 },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="brand-section">
        <div className="brand-logo-icon">d</div>
        <div>
          <h2 className="brand-title">dialr</h2>
          <span className="brand-tagline">Smart Organizer</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-menu">
        <div className="sidebar-heading">Contacts</div>
        {navItems.map((item) => {
          const isActive = activeFilter === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectFilter(item.id)}
            >
              <span className="nav-item-left">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
              <span className="nav-item-count">{item.count}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <p>CircleBook / dialr v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
