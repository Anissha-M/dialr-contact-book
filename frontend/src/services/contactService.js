import axios from 'axios';

// Backend API Base URL from environment variable or default local URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/contacts';

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all contacts, with optional category or favorite filter
export const getContacts = async (category, favorite) => {
  const params = {};
  if (favorite) {
    params.favorite = true;
  } else if (category && category !== 'All') {
    params.category = category;
  }
  const response = await apiClient.get('', { params });
  return response.data;
};

// Get single contact by ID
export const getContactById = async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

// Create new contact
export const createContact = async (contactData) => {
  const response = await apiClient.post('', contactData);
  return response.data;
};

// Update existing contact
export const updateContact = async (id, contactData) => {
  const response = await apiClient.put(`/${id}`, contactData);
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const response = await apiClient.delete(`/${id}`);
  return response.data;
};

// Toggle favorite status
export const toggleFavorite = async (id) => {
  const response = await apiClient.patch(`/${id}/favorite`);
  return response.data;
};

// Search contacts by keyword
export const searchContacts = async (query) => {
  const response = await apiClient.get('/search', {
    params: { query },
  });
  return response.data;
};
