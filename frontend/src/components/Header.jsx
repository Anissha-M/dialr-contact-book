import React from 'react';

// Top dashboard header with title and new contact action
function Header({ onOpenAddModal }) {
  return (
    <header className="dashboard-header">
      <div className="header-title-box">
        <h1>Your people, thoughtfully organized</h1>
        <p>Keep your important connections in one place.</p>
      </div>

      <div className="header-action-box">
        <button className="btn-primary" onClick={onOpenAddModal}>
          <span>+</span>
          <span>Add Contact</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
