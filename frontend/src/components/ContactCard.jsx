import React from 'react';

// ContactCard renders an individual contact's details and actions
function ContactCard({ contact, onEdit, onDelete, onToggleFavorite }) {
  // Helper to get initials from contact name (e.g., "John Doe" -> "JD")
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const words = fullName.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // Helper to determine CSS class for category badge
  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'work':
        return 'badge-work';
      case 'friends':
        return 'badge-friends';
      case 'family':
        return 'badge-family';
      default:
        return 'badge-other';
    }
  };

  return (
    <div className="contact-card">
      {/* Top Header of Card */}
      <div className="card-top">
        <div className="avatar-and-name">
          <div className="avatar-circle">
            {getInitials(contact.name)}
          </div>
          <div>
            <h3 className="card-name-title">{contact.name}</h3>
            {contact.company && (
              <span className="card-company-subtitle">{contact.company}</span>
            )}
          </div>
        </div>

        {/* Favorite Star Button */}
        <button
          className={`star-favorite-btn ${contact.favorite ? 'is-fav' : ''}`}
          onClick={() => onToggleFavorite(contact.id)}
          title={contact.favorite ? 'Remove from favorites' : 'Mark as favorite'}
        >
          {contact.favorite ? '★' : '☆'}
        </button>
      </div>

      {/* Middle Contact Information */}
      <div className="card-details">
        {/* Phone number */}
        <div className="detail-row">
          <span className="detail-icon">📞</span>
          <span>{contact.phone}</span>
        </div>

        {/* Email */}
        {contact.email && (
          <div className="detail-row">
            <span className="detail-icon">✉️</span>
            <span>{contact.email}</span>
          </div>
        )}

        {/* Notes */}
        {contact.notes && (
          <div className="detail-notes">
            {contact.notes}
          </div>
        )}
      </div>

      {/* Card Footer with Badge and Actions */}
      <div className="card-footer">
        <span className={`category-badge ${getCategoryClass(contact.category)}`}>
          {contact.category}
        </span>

        <div className="card-action-buttons">
          <button
            className="btn-card-action"
            onClick={() => onEdit(contact)}
          >
            Edit
          </button>
          <button
            className="btn-card-action btn-card-delete"
            onClick={() => onDelete(contact)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
