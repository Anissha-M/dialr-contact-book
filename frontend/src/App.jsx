import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ConfirmDialog from './components/ConfirmDialog';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  searchContacts,
} from './services/contactService';
import './App.css';

function App() {
  // Contacts list retrieved from API
  const [contacts, setContacts] = useState([]);
  // Counts summary state
  const [allContacts, setAllContacts] = useState([]);
  
  // Active filter state: 'All', 'Favorites', 'Work', 'Friends', 'Family', 'Other'
  const [activeFilter, setActiveFilter] = useState('All');
  // Live search query text
  const [searchQuery, setSearchQuery] = useState('');
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Notification toast/banner state
  const [feedback, setFeedback] = useState(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  // Delete confirmation dialog state
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Helper to show brief feedback toast
  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  // Fetch all contacts to calculate summary counts
  const fetchAllForCounts = async () => {
    try {
      const data = await getContacts('All', false);
      setAllContacts(data);
    } catch (err) {
      console.error('Error fetching count data:', err);
    }
  };

  // Fetch contacts based on active filter and search text
  const fetchContacts = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      let data = [];
      if (searchQuery.trim()) {
        // Search API endpoint
        data = await searchContacts(searchQuery.trim());
      } else if (activeFilter === 'Favorites') {
        // Filter by favorites
        data = await getContacts(null, true);
      } else {
        // Filter by category or All
        data = await getContacts(activeFilter, false);
      }
      setContacts(data);
      // Also update counts
      fetchAllForCounts();
    } catch (err) {
      console.error('API Error:', err);
      setErrorMessage(
        'Unable to connect to the backend server. Please verify Spring Boot and MySQL are running.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Run fetchContacts whenever active filter changes
  useEffect(() => {
    if (!searchQuery) {
      fetchContacts();
    }
  }, [activeFilter]);

  // Handle live search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchContacts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Calculate summary counts dynamically from actual database records
  const counts = {
    total: allContacts.length,
    favorites: allContacts.filter((c) => c.favorite).length,
    work: allContacts.filter((c) => c.category?.toLowerCase() === 'work').length,
    friends: allContacts.filter((c) => c.category?.toLowerCase() === 'friends').length,
    family: allContacts.filter((c) => c.category?.toLowerCase() === 'family').length,
    other: allContacts.filter((c) => c.category?.toLowerCase() === 'other').length,
  };

  // Open modal to add a new contact
  const handleOpenAddModal = () => {
    setContactToEdit(null);
    setIsFormOpen(true);
  };

  // Open modal to edit an existing contact
  const handleOpenEditModal = (contact) => {
    setContactToEdit(contact);
    setIsFormOpen(true);
  };

  // Close form modal
  const handleCloseFormModal = () => {
    setIsFormOpen(false);
    setContactToEdit(null);
  };

  // Save contact (create or update)
  const handleSaveContact = async (formData) => {
    try {
      if (contactToEdit) {
        // Update existing contact
        await updateContact(contactToEdit.id, formData);
        showFeedback('success', `Updated "${formData.name}" successfully.`);
      } else {
        // Create new contact
        await createContact(formData);
        showFeedback('success', `Created contact "${formData.name}" successfully.`);
      }
      // Refresh list
      fetchContacts();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error saving contact. Please try again.';
      showFeedback('error', msg);
      throw err;
    }
  };

  // Prompt delete dialog
  const handlePromptDelete = (contact) => {
    setContactToDelete(contact);
  };

  // Confirm delete contact
  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;
    setIsDeleting(true);
    try {
      await deleteContact(contactToDelete.id);
      showFeedback('success', `Deleted "${contactToDelete.name}" successfully.`);
      setContactToDelete(null);
      fetchContacts();
    } catch (err) {
      showFeedback('error', 'Failed to delete contact from database.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Toggle favorite status
  const handleToggleFavorite = async (id) => {
    try {
      const updated = await toggleFavorite(id);
      // Optimistically update list
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, favorite: updated.favorite } : c))
      );
      setAllContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, favorite: updated.favorite } : c))
      );
      const statusText = updated.favorite ? 'marked as favorite' : 'removed from favorites';
      showFeedback('success', `"${updated.name}" ${statusText}.`);
    } catch (err) {
      showFeedback('error', 'Failed to update favorite status.');
    }
  };

  // Handle category filter click
  const handleFilterSelect = (category) => {
    setSearchQuery('');
    setActiveFilter(category);
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <Sidebar
        activeFilter={activeFilter}
        onSelectFilter={handleFilterSelect}
        counts={counts}
      />

      {/* Main Dashboard Area */}
      <main className="app-main">
        {/* Header Section */}
        <Header onOpenAddModal={handleOpenAddModal} />

        {/* Feedback Alert */}
        {feedback && (
          <div className={`feedback-banner ${feedback.type}`}>
            <span>{feedback.message}</span>
            <button
              className="banner-close-btn"
              onClick={() => setFeedback(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Backend Error Banner */}
        {errorMessage && (
          <div className="feedback-banner error">
            <div>
              <strong>Connection Error:</strong> {errorMessage}
            </div>
            <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={fetchContacts}>
              Retry
            </button>
          </div>
        )}

        {/* Summary Metric Cards */}
        <SummaryCards counts={counts} />

        {/* Search & Filter Status Toolbar */}
        <div className="toolbar-section">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
          />

          <div className="filter-badge-indicator">
            <span>Showing:</span>
            <strong>
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeFilter === 'All'
                ? 'All Contacts'
                : activeFilter}
            </strong>
            <span>({contacts.length})</span>
          </div>
        </div>

        {/* Contacts Grid / List */}
        <ContactList
          contacts={contacts}
          loading={loading}
          onEdit={handleOpenEditModal}
          onDelete={handlePromptDelete}
          onToggleFavorite={handleToggleFavorite}
          onOpenAddModal={handleOpenAddModal}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
        />
      </main>

      {/* Add / Edit Contact Modal */}
      <ContactForm
        isOpen={isFormOpen}
        onClose={handleCloseFormModal}
        onSave={handleSaveContact}
        contactToEdit={contactToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(contactToDelete)}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleConfirmDelete}
        contactName={contactToDelete?.name || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default App;
