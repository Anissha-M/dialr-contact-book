package com.circlebook.service;

import com.circlebook.dto.ContactRequest;
import com.circlebook.entity.Contact;
import com.circlebook.exception.ResourceNotFoundException;
import com.circlebook.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    // Repository dependency
    private final ContactRepository contactRepository;

    // Constructor-based dependency injection
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // Get all contacts with optional filter by category or favorite status
    public List<Contact> getAllContacts(String category, Boolean favorite) {
        // If favorite filter is requested
        if (favorite != null && favorite) {
            return contactRepository.findByFavoriteTrueOrderByNameAsc();
        }

        // If category filter is provided (e.g. Work, Friends, Family, Other)
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
            return contactRepository.findByCategoryIgnoreCaseOrderByNameAsc(category.trim());
        }

        // Return all contacts sorted by name
        return contactRepository.findAllByOrderByNameAsc();
    }

    // Get a single contact by ID
    public Contact getContactById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
    }

    // Save a new contact to database
    public Contact createContact(ContactRequest request) {
        Contact contact = new Contact();
        contact.setName(request.getName().trim());
        contact.setPhone(request.getPhone().trim());
        
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            contact.setEmail(request.getEmail().trim());
        } else {
            contact.setEmail(null);
        }

        if (request.getCompany() != null && !request.getCompany().trim().isEmpty()) {
            contact.setCompany(request.getCompany().trim());
        } else {
            contact.setCompany(null);
        }

        contact.setCategory(request.getCategory().trim());

        if (request.getNotes() != null && !request.getNotes().trim().isEmpty()) {
            contact.setNotes(request.getNotes().trim());
        } else {
            contact.setNotes(null);
        }

        contact.setFavorite(request.getFavorite() != null ? request.getFavorite() : false);

        return contactRepository.save(contact);
    }

    // Update an existing contact
    public Contact updateContact(Long id, ContactRequest request) {
        Contact existingContact = getContactById(id);

        existingContact.setName(request.getName().trim());
        existingContact.setPhone(request.getPhone().trim());

        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            existingContact.setEmail(request.getEmail().trim());
        } else {
            existingContact.setEmail(null);
        }

        if (request.getCompany() != null && !request.getCompany().trim().isEmpty()) {
            existingContact.setCompany(request.getCompany().trim());
        } else {
            existingContact.setCompany(null);
        }

        existingContact.setCategory(request.getCategory().trim());

        if (request.getNotes() != null && !request.getNotes().trim().isEmpty()) {
            existingContact.setNotes(request.getNotes().trim());
        } else {
            existingContact.setNotes(null);
        }

        if (request.getFavorite() != null) {
            existingContact.setFavorite(request.getFavorite());
        }

        return contactRepository.save(existingContact);
    }

    // Delete a contact by ID
    public void deleteContact(Long id) {
        Contact contact = getContactById(id);
        contactRepository.delete(contact);
    }

    // Toggle favorite status (starred / unstarred)
    public Contact toggleFavorite(Long id) {
        Contact contact = getContactById(id);
        boolean currentStatus = Boolean.TRUE.equals(contact.getFavorite());
        contact.setFavorite(!currentStatus);
        return contactRepository.save(contact);
    }

    // Search contacts by name, phone or email
    public List<Contact> searchContacts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return contactRepository.findAllByOrderByNameAsc();
        }
        return contactRepository.searchContacts(query.trim());
    }
}
