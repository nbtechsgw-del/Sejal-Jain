package com.carwash.backend.repository;

import com.carwash.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByResetToken(String resetToken);


    // =========================
    // CUSTOMER GROWTH
    // =========================

    @Query("""
        SELECT MONTH(c.createdAt), COUNT(c)
        FROM Customer c
        WHERE c.createdAt IS NOT NULL
        GROUP BY MONTH(c.createdAt)
        ORDER BY MONTH(c.createdAt)
    """)
    List<Object[]> getCustomerGrowth();
}