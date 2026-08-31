import { useState } from "react";
import "./Reviews.css";

function ReviewForm({
  customerId,
  serviceId,
  existingReview,
  onReviewSubmitted,
  onCancel,
}) {
  const [rating, setRating] = useState(
    existingReview?.rating || 0
  );

  const [review, setReview] = useState(
    existingReview?.review || ""
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }

    if (!review.trim()) {
      setError("Please write a review.");
      return;
    }

    try {
      setLoading(true);

      const isEditing = Boolean(existingReview);

      const url = isEditing
        ? `http://localhost:8080/api/reviews/${existingReview.reviewId}`
        : "http://localhost:8080/api/reviews";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: Number(customerId),
          serviceId: Number(serviceId),
          rating: Number(rating),
          review: review.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to save review."
        );
      }

      alert(
        isEditing
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );

      setRating(0);
      setReview("");

      if (onReviewSubmitted) {
        onReviewSubmitted(data);
      }
    } catch (error) {
      console.error("Review error:", error);

      setError(
        error.message ||
          "Something went wrong while saving review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-card">

      <div className="review-form-header">
        <div>
          <h2>
            {existingReview
              ? "Edit Your Review"
              : "Write a Review"}
          </h2>

          <p>
            Share your experience with our car wash service.
          </p>
        </div>
      </div>

      {error && (
        <div className="review-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* STAR RATING */}

        <div className="rating-section">

          <label>Your Rating</label>

          <div className="star-rating">

            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={
                  star <= rating
                    ? "star active"
                    : "star"
                }
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}

          </div>

          {rating > 0 && (
            <span className="rating-text">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          )}

        </div>


        {/* REVIEW */}

        <div className="review-input-group">

          <label htmlFor="review">
            Your Review
          </label>

          <textarea
            id="review"
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
            placeholder="Tell us about your experience..."
            rows="5"
            maxLength="500"
          />

          <small>
            {review.length}/500 characters
          </small>

        </div>


        {/* BUTTONS */}

        <div className="review-form-actions">

          {onCancel && (
            <button
              type="button"
              className="review-cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="review-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : existingReview
              ? "Update Review"
              : "Submit Review"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default ReviewForm;