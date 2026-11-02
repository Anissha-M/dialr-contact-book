package com.circlebook.controller;

import com.circlebook.dto.ContactRequest;
import com.circlebook.entity.Contact;
import com.circlebook.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*") // Allow requests from React frontend
public class ContactController {

    // Service layer dependency
    private final ContactService contactService;

    // Constructor-based dependency injection
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // GET /api/contacts - Get all contacts (or filter by category / favorite)
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean favorite) {
        List<Contact> contacts = contactService.getAllContacts(category, favorite);
        return ResponseEntity.ok(contacts);
    }

    // GET /api/contacts/search?query=... - Search contacts by name, phone or email
    @GetMapping("/search")
    public ResponseEntity<List<Contact>> searchContacts(@RequestParam String query) {
        List<Contact> searchResults = contactService.searchContacts(query);
        return ResponseEntity.ok(searchResults);
    }

    // GET /api/contacts/{id} - Get single contact by ID
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Contact contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

    // POST /api/contacts - Create a new contact
    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody ContactRequest request) {
        Contact createdContact = contactService.createContact(request);
        return new ResponseEntity<>(createdContact, HttpStatus.CREATED);
    }

    // PUT /api/contacts/{id} - Update an existing contact
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable Long id,
            @Valid @RequestBody ContactRequest request) {
        Contact updatedContact = contactService.updateContact(id, request);
        return ResponseEntity.ok(updatedContact);
    }

    // DELETE /api/contacts/{id} - Delete a contact
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }

    // PATCH /api/contacts/{id}/favorite - Toggle favorite status
    @PatchMapping("/{id}/favorite")
    public ResponseEntity<Contact> toggleFavorite(@PathVariable Long id) {
        Contact updatedContact = contactService.toggleFavorite(id);
        return ResponseEntity.ok(updatedContact);
    }
}
