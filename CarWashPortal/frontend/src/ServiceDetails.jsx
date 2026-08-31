import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import Reviews from "./components/Reviews";
import "./ServiceDetails.css";

function ServiceDetails({ serviceId, onBack }) {
  const [service, setService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET LOGGED-IN CUSTOMER
  // =========================

  const customer = JSON.parse(
    localStorage.getItem("customer") || "null"
  );

  const userId = customer?.id || 1;

  // =========================
  // FETCH SERVICE
  // =========================

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/api/services/${serviceId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch service. Status: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("SERVICE DETAILS:", data);

        setService(data);
      } catch (error) {
        console.error("SERVICE DETAILS ERROR:", error);

        setError("Unable to load service details.");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="service-details-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>

          <h2>Loading Service...</h2>

          <p>
            Please wait while we fetch the service details.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="service-details-container">
        <button
          className="back-btn"
          onClick={onBack}
          type="button"
        >
          ← Back to Services
        </button>

        <div className="service-details-card">
          <div className="error-icon">⚠️</div>

          <h2>Something went wrong</h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  // =========================
  // SERVICE NOT FOUND
  // =========================

  if (!service) {
    return (
      <div className="service-details-container">
        <button
          className="back-btn"
          onClick={onBack}
          type="button"
        >
          ← Back to Services
        </button>

        <div className="service-details-card">
          <div className="error-icon">🚗</div>

          <h2>Service Not Found</h2>

          <p>
            The selected car wash service could not be found.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // BOOKING FORM
  // =========================

  if (showBooking) {
    return (
      <BookingForm
        service={service}
        onBack={() => setShowBooking(false)}
      />
    );
  }

  // =========================
  // SERVICE DETAILS
  // =========================

  return (
    <div className="service-details-container">

      {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={onBack}
        type="button"
      >
        ← Back to Services
      </button>

      <div className="service-details-card">

        {/* =========================
            SERVICE IMAGE
        ========================= */}

        <div className="service-image-wrapper">

          {service.imageUrl ? (
            <img
              src={`http://localhost:8080${service.imageUrl}`}
              alt={service.name || "Car Wash Service"}
              className="service-details-image"
            />
          ) : (
            <div className="service-image-placeholder">
              🚗
            </div>
          )}

          <div className="image-badge">
            ✨ Premium Service
          </div>

        </div>

        {/* =========================
            SERVICE CONTENT
        ========================= */}

        <div className="service-details-content">

          {/* TITLE */}

          <div className="service-title-row">

            <div>
              <span className="details-label">
                CAR WASH SERVICE
              </span>

              <h1>
                {service.name || "Car Wash Service"}
              </h1>
            </div>

            <div className="service-price">
              ₹{Number(service.price || 0).toFixed(0)}
            </div>

          </div>

          {/* DESCRIPTION */}

          <p className="service-description">
            {service.description ||
              "Professional car wash service designed to keep your vehicle clean, fresh and shining."}
          </p>

          {/* =========================
              SERVICE INFORMATION
          ========================= */}

          <div className="service-info-grid">

            <div className="info-box category-box">
              <span className="info-icon">🏷️</span>

              <div>
                <small>Category</small>

                <strong>
                  {service.category || "General"}
                </strong>
              </div>
            </div>

            <div className="info-box duration-box">
              <span className="info-icon">⏱️</span>

              <div>
                <small>Duration</small>

                <strong>
                  {service.duration
                    ? `${service.duration} Minutes`
                    : "Not Set"}
                </strong>
              </div>
            </div>

            <div className="info-box price-box">
              <span className="info-icon">💰</span>

              <div>
                <small>Starting Price</small>

                <strong>
                  ₹{Number(service.price || 0).toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="info-box availability-box">
              <span className="info-icon">✓</span>

              <div>
                <small>Availability</small>

                <strong>
                  {service.active
                    ? "Available"
                    : "Unavailable"}
                </strong>
              </div>
            </div>

          </div>

          {/* =========================
              INCLUDED FEATURES
          ========================= */}

          <div className="details-section">

            <h2>
              <span>✨</span> What's Included
            </h2>

            <div className="feature-grid">

              <div className="feature-item">
                <span>✓</span>
                Exterior Cleaning
              </div>

              <div className="feature-item">
                <span>✓</span>
                Interior Cleaning
              </div>

              <div className="feature-item">
                <span>✓</span>
                Dashboard Cleaning
              </div>

              <div className="feature-item">
                <span>✓</span>
                Tyre Cleaning
              </div>

            </div>

          </div>

          {/* =========================
              AVAILABILITY
          ========================= */}

          <div className="details-section">

            <h2>
              <span>🕘</span> Availability Schedule
            </h2>

            <div className="schedule-card">

              <div>
                <strong>
                  Monday - Saturday
                </strong>

                <span>
                  Working Days
                </span>
              </div>

              <div className="schedule-time">
                9:00 AM - 7:00 PM
              </div>

            </div>

          </div>

          {/* =========================
              CUSTOMER REVIEWS
          ========================= */}

          <div className="details-section reviews-section">

            <h2>
              <span>⭐</span> Customer Reviews
            </h2>

            <Reviews
              serviceId={serviceId}
              userId={userId}
            />

          </div>

          {/* =========================
              BOOK SERVICE
          ========================= */}

          <div className="book-service-area">

            <div className="book-note">
              🔒 Secure booking • Easy cancellation
            </div>

            <button
              className="book-service-btn"
              disabled={!service.active}
              onClick={() => setShowBooking(true)}
              type="button"
            >
              {service.active
                ? "🚗 Book This Service"
                : "Currently Unavailable"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;