import { useEffect, useState } from "react";
import "./Reviews.css";

function AdminReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD ALL REVIEWS
  // =========================

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/reviews"
      );

      if (!response.ok) {
        throw new Error("Failed to load reviews");
      }

      const data = await response.json();

      console.log("Admin Reviews:", data);

      setReviews(data);
    } catch (error) {
      console.error("Review loading error:", error);
      setError("Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // =========================
  // DELETE REVIEW
  // =========================

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this review?"
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

      setReviews((previousReviews) =>
        previousReviews.filter(
          (review) => review.reviewId !== reviewId
        )
      );

      alert("Review removed successfully!");
    } catch (error) {
      console.error("Delete review error:", error);
      alert("Unable to remove review.");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-container">
        <div className="admin-review-page">
          <h1>Reviews & Ratings</h1>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="admin-container">

      <div className="admin-review-page">

        {/* HEADER */}

        <div className="admin-review-header">

          <div>
            <h1>Reviews & Ratings</h1>

            <p>
              View and manage customer feedback
              about your car wash services.
            </p>
          </div>

          <div className="review-count-box">
            <strong>{reviews.length}</strong>
            <span>
              {reviews.length === 1
                ? "Review"
                : "Reviews"}
            </span>
          </div>

        </div>


        {/* ERROR */}

        {error && (
          <div className="review-error">
            {error}
          </div>
        )}


        {/* NO REVIEWS */}

        {reviews.length === 0 ? (

          <div className="no-reviews">

            <h2>
              No Customer Reviews
            </h2>

            <p>
              Customer reviews will appear here
              once they submit feedback.
            </p>

          </div>

        ) : (

          <div className="admin-reviews-list">

            {reviews.map((review) => (

              <div
                className="admin-review-card"
                key={review.reviewId}
              >

                {/* REVIEW HEADER */}

                <div className="admin-review-card-header">

                  <div className="admin-review-user">

                    <div className="review-avatar">
                      U
                    </div>

                    <div>

                      <h3>
                        Customer #{review.userId}
                      </h3>

                      <span>
                        Review ID: #{review.reviewId}
                      </span>

                    </div>

                  </div>


                  {/* RATING */}

                  <div className="admin-review-rating">

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

                    <strong>
                      {review.rating}/5
                    </strong>

                  </div>

                </div>


                {/* REVIEW DETAILS */}

                <div className="admin-review-details">

                  <div>
                    <span>
                      Customer ID
                    </span>

                    <strong>
                      #{review.userId}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Service ID
                    </span>

                    <strong>
                      #{review.serviceId}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Date
                    </span>

                    <strong>
                      {review.createdAt
                        ? new Date(
                            review.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </strong>
                  </div>

                </div>


                {/* REVIEW TEXT */}

                <div className="admin-review-content">

                  <span>
                    Customer Feedback
                  </span>

                  <p>
                    "{review.review}"
                  </p>

                </div>


                {/* ACTION */}

                <div className="admin-review-actions">

                  <button
                    className="delete-review-btn"
                    onClick={() =>
                      handleDelete(
                        review.reviewId
                      )
                    }
                  >
                    Remove Review
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminReviewManagement;