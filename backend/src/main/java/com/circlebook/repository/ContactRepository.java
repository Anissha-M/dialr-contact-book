package com.circlebook.repository;

import com.circlebook.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    // Get all contacts sorted alphabetically
    List<Contact> findAllByOrderByNameAsc();

    // Filter contacts by category (e.g. Work, Friends, Family, Other)
    List<Contact> findByCategoryIgnoreCaseOrderByNameAsc(String category);

    // Filter contacts that are marked as favorite
    List<Contact> findByFavoriteTrueOrderByNameAsc();

    // Search contacts by name, phone or email
    @Query("SELECT c FROM Contact c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "c.phone LIKE CONCAT('%', :keyword, '%') OR " +
           "(c.email IS NOT NULL AND LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY c.name ASC")
    List<Contact> searchContacts(@Param("keyword") String keyword);
}
