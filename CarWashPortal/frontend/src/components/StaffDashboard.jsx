import { useEffect, useState } from "react";
import "./StaffDashboard.css";

function StaffDashboard({
  staffId,
  onBackToDashboard,
  onLogout
}) {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingBooking, setUpdatingBooking] = useState(null);

  // =========================
  // GET ASSIGNED BOOKINGS
  // =========================

  const fetchBookings = async () => {

    if (!staffId) {
      setBookings([]);
      setLoading(false);
      setError("Staff ID is not available.");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:8080/api/bookings/staff/${staffId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch bookings (${response.status})`
        );
      }

      const data = await response.json();

      console.log("STAFF ID:", staffId);
      console.log("ASSIGNED BOOKINGS:", data);

      setBookings(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.error(
        "Error fetching staff bookings:",
        error
      );

      setError(
        "Unable to load assigned bookings."
      );

      setBookings([]);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // LOAD BOOKINGS
  // =========================

  useEffect(() => {
    fetchBookings();
  }, [staffId]);

  // =========================
  // UPDATE BOOKING STATUS
  // =========================

  const updateStatus = async (
    bookingId,
    status
  ) => {

    if (!bookingId) {
      alert("Booking ID is missing.");
      return;
    }

    try {

      setUpdatingBooking(bookingId);

      console.log(
        "Updating booking:",
        bookingId,
        "Status:",
        status
      );

      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}/status?status=${encodeURIComponent(status)}`,
        {
          method: "PUT"
        }
      );

      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
          "Failed to update booking status."
        );
      }

      const updatedBooking =
        await response.json();

      console.log(
        "UPDATED BOOKING:",
        updatedBooking
      );

      setBookings(
        (previousBookings) =>
          previousBookings.map(
            (booking) =>
              booking.id === bookingId
                ? updatedBooking
                : booking
          )
      );

      if (status === "IN PROGRESS") {

        alert(
          "Service started successfully!"
        );

      } else if (status === "COMPLETED") {

        alert(
          "Job marked as completed successfully!"
        );

      }

    } catch (error) {

      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      alert(
        error.message ||
        "Unable to update booking status."
      );

    } finally {

      setUpdatingBooking(null);

    }
  };

  // =========================
  // STATUS CLASS
  // =========================

  const getStatusClass = (status) => {

    return (
      status || "PENDING"
    )
      .toLowerCase()
      .replace(/\s+/g, "-");

  };

  // =========================
  // BACK TO ADMIN DASHBOARD
  // =========================

  const handleBack = () => {

    if (onBackToDashboard) {
      onBackToDashboard();
    }

  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("staff");

    if (onLogout) {
      onLogout();
    }

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="staff-dashboard">

        <div className="staff-top-actions">

          <button
            type="button"
            className="back-dashboard-btn"
            onClick={handleBack}
          >
            ← Back to Admin Dashboard
          </button>

          <button
            type="button"
            className="staff-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        <div className="staff-loading">

          <div className="staff-spinner"></div>

          <h2>
            Loading Staff Dashboard...
          </h2>

          <p>
            Fetching your assigned bookings.
          </p>

        </div>

      </div>

    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (

    <div className="staff-dashboard">

      {/* TOP ACTIONS */}

      <div className="staff-top-actions">

        <button
          type="button"
          className="back-dashboard-btn"
          onClick={handleBack}
        >
          ← Back to Admin Dashboard
        </button>

        <button
          type="button"
          className="staff-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* HEADER */}

      <div className="staff-dashboard-header">

        <div>

          <span className="staff-dashboard-label">
            STAFF PORTAL
          </span>

          <h1>
            Staff Dashboard
          </h1>

          <p>
            View and manage your assigned car wash jobs.
          </p>

        </div>

        <div className="staff-id-box">

          <span>
            Staff ID
          </span>

          <strong>
            #{staffId}
          </strong>

        </div>

      </div>

      {/* SUMMARY */}

      <div className="staff-summary">

        <div className="summary-card total-card">

          <div className="summary-icon">
            📋
          </div>

          <div>

            <span>
              Assigned Jobs
            </span>

            <strong>
              {bookings.length}
            </strong>

          </div>

        </div>

        <div className="summary-card progress-card">

          <div className="summary-icon">
            🔄
          </div>

          <div>

            <span>
              In Progress
            </span>

            <strong>
              {
                bookings.filter(
                  (booking) =>
                    (
                      booking.bookingStatus ||
                      booking.status
                    )?.toUpperCase() ===
                    "IN PROGRESS"
                ).length
              }
            </strong>

          </div>

        </div>

        <div className="summary-card completed-card">

          <div className="summary-icon">
            ✅
          </div>

          <div>

            <span>
              Completed
            </span>

            <strong>
              {
                bookings.filter(
                  (booking) =>
                    (
                      booking.bookingStatus ||
                      booking.status
                    )?.toUpperCase() ===
                    "COMPLETED"
                ).length
              }
            </strong>

          </div>

        </div>

      </div>

      {/* ERROR */}

      {error && (

        <div className="staff-error">

          <h3>
            Something went wrong
          </h3>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={fetchBookings}
          >
            Try Again
          </button>

        </div>

      )}

      {/* NO BOOKINGS */}

      {!error &&
        bookings.length === 0 && (

          <div className="staff-empty">

            <div className="empty-staff-icon">
              🚗
            </div>

            <h2>
              No Assigned Bookings
            </h2>

            <p>
              You currently have no bookings assigned to you.
            </p>

          </div>

        )}

      {/* BOOKING LIST */}

      {!error &&
        bookings.length > 0 && (

          <div className="staff-booking-list">

            {bookings.map((booking) => {

              const currentStatus =
                (
                  booking.bookingStatus ||
                  booking.status ||
                  "PENDING"
                ).toUpperCase();

              const isUpdating =
                updatingBooking === booking.id;

              return (

                <div
                  className="staff-booking-card"
                  key={booking.id}
                >

                  {/* BOOKING HEADER */}

                  <div className="staff-booking-header">

                    <div>

                      <span className="staff-booking-id">
                        BOOKING #{booking.id}
                      </span>

                      <h2>
                        {booking.serviceName ||
                          "Car Wash Service"}
                      </h2>

                    </div>

                    <span
                      className={`staff-status-badge ${getStatusClass(
                        currentStatus
                      )}`}
                    >
                      {currentStatus}
                    </span>

                  </div>

                  {/* BOOKING DETAILS */}

                  <div className="staff-booking-details">

                    <div className="staff-detail-box">

                      <span>
                        👤 Customer ID
                      </span>

                      <strong>
                        #{booking.customerId || "N/A"}
                      </strong>

                    </div>

                    <div className="staff-detail-box">

                      <span>
                        🚘 Vehicle ID
                      </span>

                      <strong>
                        #{booking.vehicleId || "N/A"}
                      </strong>

                    </div>

                    <div className="staff-detail-box">

                      <span>
                        📅 Date
                      </span>

                      <strong>
                        {booking.bookingDate || "N/A"}
                      </strong>

                    </div>

                    <div className="staff-detail-box">

                      <span>
                        ⏰ Time
                      </span>

                      <strong>
                        {booking.bookingTime || "N/A"}
                      </strong>

                    </div>

                    <div className="staff-detail-box">

                      <span>
                        📍 Location
                      </span>

                      <strong>
                        {booking.serviceLocation || "N/A"}
                      </strong>

                    </div>

                    <div className="staff-detail-box">

                      <span>
                        🚗 Pickup & Drop
                      </span>

                      <strong>
                        {booking.pickupDrop
                          ? "Yes"
                          : "No"}
                      </strong>

                    </div>

                  </div>

                  {/* PRICE */}

                  <div className="staff-price-box">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹
                      {Number(
                        booking.totalAmount ||
                        booking.amount ||
                        0
                      ).toFixed(2)}
                    </strong>

                  </div>

                  {/* INSTRUCTIONS */}

                  {booking.additionalInstructions && (

                    <div className="staff-instructions">

                      <strong>
                        📝 Customer Instructions
                      </strong>

                      <p>
                        {booking.additionalInstructions}
                      </p>

                    </div>

                  )}

                  {/* SERVICE STATUS */}

                  <div className="staff-service-status">

                    <div>

                      <span>
                        Current Service Status
                      </span>

                      <strong>
                        {currentStatus}
                      </strong>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="staff-actions">

                    <button
                      type="button"
                      className="start-service-btn"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "IN PROGRESS"
                        )
                      }
                      disabled={
                        currentStatus !== "ASSIGNED" ||
                        isUpdating
                      }
                    >
                      {isUpdating
                        ? "Updating..."
                        : "▶ Start Service"}
                    </button>

                    <button
                      type="button"
                      className="complete-service-btn"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "COMPLETED"
                        )
                      }
                      disabled={
                        currentStatus !== "IN PROGRESS" ||
                        isUpdating
                      }
                    >
                      {isUpdating
                        ? "Updating..."
                        : "✓ Mark Completed"}
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

    </div>

  );
}

export default StaffDashboard;