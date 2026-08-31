package com.carwash.backend.service;

import com.carwash.backend.entity.Review;
import com.carwash.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // =========================
    // ADD REVIEW
    // =========================

    public Review addReview(Review review) {

        if (review.getRating() == null ||
                review.getRating() < 1 ||
                review.getRating() > 5) {

            throw new RuntimeException(
                    "Rating must be between 1 and 5."
            );
        }

        if (review.getReview() == null ||
                review.getReview().isBlank()) {

            throw new RuntimeException(
                    "Review cannot be empty."
            );
        }

        review.setCreatedAt(
                LocalDateTime.now()
        );

        return reviewRepository.save(review);
    }


    // =========================
    // GET ALL REVIEWS
    // =========================

    public List<Review> getAllReviews() {

        return reviewRepository.findAll();
    }


    // =========================
    // GET REVIEWS BY SERVICE
    // =========================

    public List<Review> getReviewsByService(
            Long serviceId) {

        return reviewRepository.findByServiceId(
                serviceId
        );
    }


    // =========================
    // GET REVIEWS BY USER
    // =========================

    public List<Review> getReviewsByUser(
            Long userId) {

        return reviewRepository.findByUserId(
                userId
        );
    }


    // =========================
    // UPDATE REVIEW
    // =========================

    public Review updateReview(
            Long id,
            Review review) {

        Review existingReview =
                reviewRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Review not found with id: " + id
                                )
                        );

        if (review.getRating() == null ||
                review.getRating() < 1 ||
                review.getRating() > 5) {

            throw new RuntimeException(
                    "Rating must be between 1 and 5."
            );
        }

        if (review.getReview() == null ||
                review.getReview().isBlank()) {

            throw new RuntimeException(
                    "Review cannot be empty."
            );
        }

        existingReview.setRating(
                review.getRating()
        );

        existingReview.setReview(
                review.getReview()
        );

        return reviewRepository.save(
                existingReview
        );
    }


    // =========================
    // DELETE REVIEW
    // =========================

    public void deleteReview(Long id) {

        if (!reviewRepository.existsById(id)) {

            throw new RuntimeException(
                    "Review not found with id: " + id
            );
        }

        reviewRepository.deleteById(id);
    }
}