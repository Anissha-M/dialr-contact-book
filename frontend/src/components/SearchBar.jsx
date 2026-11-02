import React from 'react';

// Search input for filtering contacts by name, phone, or email
function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  return (
    <div className="search-box-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, phone or email..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={onClearSearch}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
