import React, { useState, useEffect } from 'react';

// ContactForm modal for adding or editing contacts
function ContactForm({ isOpen, onClose, onSave, contactToEdit }) {
  // Form fields state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    category: 'Work',
    notes: '',
    favorite: false,
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  // Submitting state to prevent accidental duplicate submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When modal opens or contactToEdit changes, initialize form
  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name || '',
        phone: contactToEdit.phone || '',
        email: contactToEdit.email || '',
        company: contactToEdit.company || '',
        category: contactToEdit.category || 'Work',
        notes: contactToEdit.notes || '',
        favorite: contactToEdit.favorite || false,
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        category: 'Work',
        notes: '',
        favorite: false,
      });
    }
    setErrors({});
    setIsSubmitting(false);
  }, [contactToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form fields on the frontend
  const validateForm = () => {
    const newErrors = {};

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Phone is required
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 5) {
      newErrors.phone = 'Phone number must have at least 5 digits';
    }

    // Email format validation (only if provided)
    if (formData.email.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Category is required
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission (works for both button click and Enter key)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      // Clear form and errors on success
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        category: 'Work',
        notes: '',
        favorite: false,
      });
      setErrors({});
      onClose();
    } catch (err) {
      // If backend returned field errors, display them while preserving form data
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = Boolean(contactToEdit);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h2>
          <button className="modal-close-icon" onClick={onClose} title="Close" type="button">
            ✕
          </button>
        </div>

        {/* Modal Body / Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-body form-layout">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="label-required">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && <span className="field-error-msg">{errors.name}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="label-required">*</span>
              </label>
              <input
                type="text"
                name="phone"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="e.g. +1 555-0199 or 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
            </div>

            {/* Email and Company Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  className="form-input"
                  placeholder="e.g. Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="form-group">
              <label className="form-label">
                Category <span className="label-required">*</span>
              </label>
              <select
                name="category"
                className={`form-select ${errors.category ? 'input-error' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Work">Work</option>
                <option value="Friends">Friends</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <span className="field-error-msg">{errors.category}</span>
              )}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                className="form-textarea"
                rows="3"
                placeholder="Any special details, meeting context or relationship info..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Mark as Favorite Checkbox */}
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                name="favorite"
                checked={formData.favorite}
                onChange={handleChange}
              />
              <span>Mark as Favorite Contact ⭐</span>
            </label>
          </div>

          {/* Modal Footer Actions - Always pinned and clearly visible */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-contact-btn"
              className="btn-primary btn-save-contact"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Saving...</span>
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Save Contact'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
