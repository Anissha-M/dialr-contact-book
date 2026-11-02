import React from 'react';
import ContactCard from './ContactCard';

// ContactList manages rendering contacts or displaying empty and loading states
function ContactList({
  contacts,
  loading,
  onEdit,
  onDelete,
  onToggleFavorite,
  onOpenAddModal,
  activeFilter,
  searchQuery,
}) {
  // If data is currently loading from backend
  if (loading) {
    return (
      <div className="loading-box">
        <div className="spinner"></div>
        <p>Loading contacts from database...</p>
      </div>
    );
  }

  // If there are no contacts matching the current criteria
  if (contacts.length === 0) {
    let emptyTitle = 'No contacts found';
    let emptyMessage = 'There are no contacts saved yet. Start by creating one!';

    if (searchQuery) {
      emptyTitle = `No results for "${searchQuery}"`;
      emptyMessage = 'Check the spelling or try searching with a different term.';
    } else if (activeFilter === 'Favorites') {
      emptyTitle = 'No favorites yet';
      emptyMessage = 'Click the star icon on any contact card to add them to your favorites.';
    } else if (activeFilter !== 'All') {
      emptyTitle = `No ${activeFilter} contacts`;
      emptyMessage = `You haven't categorized any contacts under "${activeFilter}" yet.`;
    }

    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">📇</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
        {!searchQuery && (
          <button className="btn-primary" onClick={onOpenAddModal}>
            + Add Contact
          </button>
        )}
      </div>
    );
  }

  // Render contacts grid
  return (
    <div className="contacts-grid">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default ContactList;
