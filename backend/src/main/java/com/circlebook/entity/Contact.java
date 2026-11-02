package com.circlebook.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Contact full name (required)
    @Column(nullable = false, length = 100)
    private String name;

    // Phone number (required)
    @Column(nullable = false, length = 20)
    private String phone;

    // Email address (optional)
    @Column(length = 100)
    private String email;

    // Company or organization (optional)
    @Column(length = 100)
    private String company;

    // Category: Work, Friends, Family, Other (required)
    @Column(nullable = false, length = 50)
    private String category;

    // Notes (optional)
    @Column(columnDefinition = "TEXT")
    private String notes;

    // Favorite status (true / false)
    @Column(nullable = false)
    private Boolean favorite = false;

    // Timestamp when contact was created
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Default constructor for JPA
    public Contact() {
    }

    // Parameterized constructor
    public Contact(String name, String phone, String email, String company, String category, String notes, Boolean favorite) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.company = company;
        this.category = category;
        this.notes = notes;
        this.favorite = favorite != null ? favorite : false;
    }

    // Automatically set created_at before inserting record
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.favorite == null) {
            this.favorite = false;
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
