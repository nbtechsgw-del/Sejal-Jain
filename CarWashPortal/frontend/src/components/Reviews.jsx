import { useEffect, useState } from "react";
import "./Reviews.css";

function Reviews({ serviceId, userId }) {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // LOAD REVIEWS
  // =========================

  const fetchReviews = async () => {
    try {
      const url = serviceId
        ? `http://localhost:8080/api/reviews/service/${serviceId}`
        : "http://localhost:8080/api/reviews";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to load reviews");
      }

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.error("Review loading error:", error);
      setError("Unable to load reviews.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [serviceId]);

  // =========================
  // SUBMIT REVIEW
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (rating < 1 || rating > 5) {
      setError("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!reviewText.trim()) {
      setError("Please write a review.");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `http://localhost:8080/api/reviews/${editingId}`
        : "http://localhost:8080/api/reviews";

      const method = editingId ? "PUT" : "POST";

      const body = editingId
        ? {
            rating,
            review: reviewText,
          }
        : {
            userId,
            serviceId,
            rating,
            review: reviewText,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save review."
        );
      }

      alert(
        editingId
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );

      setRating(0);
      setReviewText("");
      setEditingId(null);

      fetchReviews();
    } catch (error) {
      console.error("Review error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT REVIEW
  // =========================

  const handleEdit = (review) => {
    setEditingId(review.reviewId);
    setRating(review.rating);
    setReviewText(review.review);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE REVIEW
  // =========================

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      alert("Review deleted successfully!");

      setReviews((previousReviews) =>
        previousReviews.filter(
          (item) => item.reviewId !== reviewId
        )
      );
    } catch (error) {
      console.error("Delete review error:", error);
      alert("Unable to delete review.");
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setEditingId(null);
    setRating(0);
    setReviewText("");
    setError("");
  };

  // =========================
  // CHECK USER REVIEW
  // =========================

  const userReview = reviews.find(
    (review) =>
      String(review.userId) === String(userId)
  );

  return (
    <div className="reviews-container">

      {/* =========================
          HEADER
      ========================= */}

      <div className="reviews-header">
        <h2>Customer Reviews</h2>

        <p>
          Share your experience with our car wash
          service.
        </p>
      </div>

      {/* =========================
          REVIEW FORM
      ========================= */}

      {userId && (
        <div className="review-form-card">

          <h3>
            {editingId
              ? "Edit Your Review"
              : "Write a Review"}
          </h3>

          {error && (
            <div className="review-error">
              {error}
            </div>
          )}

          <div className="rating-section">

            <label>Your Rating</label>

            <div className="star-rating">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= rating
                      ? "star selected"
                      : "star"
                  }
                  onClick={() =>
                    setRating(star)
                  }
                >
                  ★
                </button>
              ))}

            </div>

            {rating > 0 && (
              <span className="rating-text">
                {rating} / 5
              </span>
            )}

          </div>

          <form onSubmit={handleSubmit}>

            <div className="review-input-group">

              <label>Your Review</label>

              <textarea
                value={reviewText}
                onChange={(e) =>
                  setReviewText(e.target.value)
                }
                placeholder="Write about your experience..."
                rows="5"
              />

            </div>

            <div className="review-form-actions">

              <button
                type="submit"
                className="submit-review-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Review"
                  : "Submit Review"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-review-btn"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      )}

      {/* =========================
          REVIEWS LIST
      ========================= */}

      <div className="reviews-list-section">

        <div className="reviews-list-header">
          <h3>
            {reviews.length}{" "}
            {reviews.length === 1
              ? "Review"
              : "Reviews"}
          </h3>
        </div>

        {reviews.length === 0 ? (

          <div className="no-reviews">

            <h3>No Reviews Yet</h3>

            <p>
              Be the first customer to share your
              experience.
            </p>

          </div>

        ) : (

          <div className="reviews-list">

            {reviews.map((review) => (

              <div
                className="review-card"
                key={review.reviewId}
              >

                <div className="review-card-header">

                  <div className="review-user">

                    <div className="review-avatar">
                      U
                    </div>

                    <div>
                      <h4>
                        Customer #{review.userId}
                      </h4>

                      <span>
                        {review.createdAt
                          ? new Date(
                              review.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                  </div>

                  <div className="review-stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <span
                          key={star}
                          className={
                            star <= review.rating
                              ? "filled-star"
                              : "empty-star"
                          }
                        >
                          ★
                        </span>
                      )
                    )}

                  </div>

                </div>

                <p className="review-text">
                  {review.review}
                </p>

                {String(review.userId) ===
                  String(userId) && (

                  <div className="review-actions">

                    <button
                      className="edit-review-btn"
                      onClick={() =>
                        handleEdit(review)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-review-btn"
                      onClick={() =>
                        handleDelete(
                          review.reviewId
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Reviews;