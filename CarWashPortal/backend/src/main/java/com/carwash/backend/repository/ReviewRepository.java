package com.carwash.backend.repository;

import com.carwash.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByServiceId(Long serviceId);

    List<Review> findByUserId(Long userId);
}