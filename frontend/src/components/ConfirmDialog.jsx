import React from 'react';

// Confirmation dialog modal before deleting a contact
function ConfirmDialog({ isOpen, onClose, onConfirm, contactName, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h2>Delete Contact</h2>
          <button className="modal-close-icon" onClick={onClose} title="Cancel">
            ✕
          </button>
        </div>

        <div className="modal-body confirm-dialog-content">
          <p>
            Are you sure you want to permanently delete <strong>{contactName}</strong>?
          </p>
          <p style={{ marginTop: '8px', fontSize: '0.86rem', color: '#6B7280' }}>
            This action cannot be undone and will remove the record from MySQL.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Contact'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
