package com.carwash.backend.controller;

import com.carwash.backend.entity.Review;
import com.carwash.backend.service.ReviewService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // =========================
    // ADD REVIEW
    // =========================

    @PostMapping
    public ResponseEntity<Review> addReview(
            @RequestBody Review review) {

        return ResponseEntity.ok(
                reviewService.addReview(review)
        );
    }

    // =========================
    // GET ALL REVIEWS
    // =========================

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {

        return ResponseEntity.ok(
                reviewService.getAllReviews()
        );
    }

    // =========================
    // GET REVIEWS BY SERVICE
    // =========================

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Review>> getReviewsByService(
            @PathVariable Long serviceId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByService(serviceId)
        );
    }

    // =========================
    // GET REVIEWS BY USER
    // =========================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByUser(userId)
        );
    }

    // =========================
    // UPDATE REVIEW
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable Long id,
            @RequestBody Review review) {

        return ResponseEntity.ok(
                reviewService.updateReview(id, review)
        );
    }

    // =========================
    // DELETE REVIEW
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(
            @PathVariable Long id) {

        reviewService.deleteReview(id);

        return ResponseEntity.ok(
                "Review deleted successfully"
        );
    }
}