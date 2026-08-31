import { useEffect, useState } from "react";

function ReviewList({ serviceId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (serviceId) {
      fetchReviews();
    }
  }, [serviceId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8080/api/reviews/service/${serviceId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();

      console.log("Service Reviews:", data);

      setReviews(data);
    } catch (error) {
      console.error("Review fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <div className="review-box">
          <p>No reviews yet.</p>
        </div>
      ) : (
        reviews.map((item) => (
          <div
            key={item.reviewId}
            className="review-item"
          >
            <div className="review-rating">
              {"⭐".repeat(item.rating)}
            </div>

            <p className="review-text">
              {item.review}
            </p>

            <small>
              User ID: {item.userId}
            </small>

            <small>
              {item.createdAt
                ? new Date(
                    item.createdAt
                  ).toLocaleDateString()
                : ""}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;