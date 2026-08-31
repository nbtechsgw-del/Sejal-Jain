import { useEffect, useState } from "react";
import "./AdminBookingManagement.css";

function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [staffInput, setStaffInput] = useState({});
  const [dateInput, setDateInput] = useState({});
  const [timeInput, setTimeInput] = useState({});

  // =========================
  // LOAD BOOKINGS + STAFF
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingResponse, staffResponse] =
          await Promise.all([
            fetch("http://localhost:8080/api/bookings"),
            fetch("http://localhost:8080/api/staff"),
          ]);

        if (!bookingResponse.ok) {
          throw new Error("Failed to fetch bookings");
        }

        if (!staffResponse.ok) {
          throw new Error("Failed to fetch staff");
        }

        const bookingData = await bookingResponse.json();
        const staffData = await staffResponse.json();

        console.log("Bookings:", bookingData);
        console.log("Staff:", staffData);

        setBookings(bookingData);
        setStaff(staffData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // UPDATE BOOKING
  // =========================

  const updateBooking = async (id, changes) => {
    const booking = bookings.find(
      (item) => item.id === id
    );

    if (!booking) {
      return;
    }

    const updatedBooking = {
      ...booking,
      ...changes,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBooking),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking");
      }

      const data = await response.json();

      console.log("Booking updated:", data);

      setBookings((previousBookings) =>
        previousBookings.map((item) =>
          item.id === id ? data : item
        )
      );
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Unable to update booking.");
    }
  };

  // =========================
  // APPROVE BOOKING
  // =========================

  const confirmBooking = (id) => {
    updateBooking(id, {
      bookingStatus: "CONFIRMED",
      status: "Confirmed",
    });
  };

  // =========================
  // ASSIGN STAFF
  // =========================

  const assignStaff = (bookingId) => {
    const selectedStaffId =
      staffInput[bookingId];

    if (!selectedStaffId) {
      alert("Please select a staff member.");
      return;
    }

    const selectedStaff = staff.find(
      (member) =>
        String(member.staffId) ===
        String(selectedStaffId)
    );

    if (!selectedStaff) {
      alert("Staff member not found.");
      return;
    }

    if (
      selectedStaff.availabilityStatus !==
      "AVAILABLE"
    ) {
      alert(
        "This staff member is currently unavailable."
      );
      return;
    }

    updateBooking(bookingId, {
      assignedStaff: Number(selectedStaffId),
      bookingStatus: "ASSIGNED",
      status: "Assigned",
    });

    alert(
      `${selectedStaff.fullName} assigned successfully!`
    );
  };

  // =========================
  // RESCHEDULE
  // =========================

  const rescheduleBooking = (id) => {
    const date = dateInput[id];
    const time = timeInput[id];

    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    updateBooking(id, {
      bookingDate: date,
      bookingTime: time,
    });

    alert("Booking rescheduled successfully!");
  };

  // =========================
  // START SERVICE
  // =========================

  const startService = (id) => {
    updateBooking(id, {
      bookingStatus: "IN PROGRESS",
      status: "In Progress",
    });
  };

  // =========================
  // COMPLETE SERVICE
  // =========================

  const completeService = (id) => {
    updateBooking(id, {
      bookingStatus: "COMPLETED",
      status: "Completed",
    });
  };

  // =========================
  // CANCEL BOOKING
  // =========================

  const cancelBooking = (id) => {
    updateBooking(id, {
      bookingStatus: "CANCELLED",
      status: "Cancelled",
    });
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-container">
        <h1>Booking Management</h1>
        <p>Loading bookings and staff...</p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="admin-container">

      <h1>Booking Management</h1>

      {bookings.length === 0 ? (

        <div className="no-bookings">

          <h2>No Bookings Found</h2>

          <p>
            There are no customer bookings yet.
          </p>

        </div>

      ) : (

        <div className="admin-booking-list">

          {bookings.map((booking) => {

            const currentStatus =
              booking.bookingStatus ||
              booking.status ||
              "PENDING";

            const assignedStaffMember =
              staff.find(
                (member) =>
                  String(member.staffId) ===
                  String(booking.assignedStaff)
              );

            return (

              <div
                className="admin-booking-card"
                key={booking.id}
              >

                {/* =========================
                    HEADER
                ========================= */}

                <div className="admin-booking-header">

                  <div>

                    <h2>
                      {booking.serviceName ||
                        "Car Wash Service"}
                    </h2>

                    <p>
                      Booking ID: #{booking.id}
                    </p>

                  </div>

                  <span
                    className={`booking-status ${currentStatus
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {currentStatus}
                  </span>

                </div>


                {/* =========================
                    BOOKING DETAILS
                ========================= */}

                <div className="admin-booking-details">

                  <div>
                    <span>Customer ID</span>
                    <strong>
                      {booking.customerId || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Vehicle ID</span>
                    <strong>
                      {booking.vehicleId || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Booking Date</span>
                    <strong>
                      {booking.bookingDate || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Booking Time</span>
                    <strong>
                      {booking.bookingTime || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Service Location</span>
                    <strong>
                      {booking.serviceLocation ||
                        "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Pickup & Drop</span>
                    <strong>
                      {booking.pickupDrop
                        ? "Yes"
                        : "No"}
                    </strong>
                  </div>

                  <div>
                    <span>Service Cost</span>
                    <strong>
                      ₹
                      {booking.serviceCost ??
                        booking.amount ??
                        0}
                    </strong>
                  </div>

                  <div>
                    <span>Additional Charges</span>
                    <strong>
                      ₹
                      {booking.additionalCharges ??
                        0}
                    </strong>
                  </div>

                  <div>
                    <span>GST</span>
                    <strong>
                      ₹{booking.gst ?? 0}
                    </strong>
                  </div>

                  <div className="booking-total">

                    <span>Total Amount</span>

                    <strong>
                      ₹
                      {booking.totalAmount ??
                        booking.amount ??
                        0}
                    </strong>

                  </div>

                </div>


                {/* =========================
                    STAFF ASSIGNMENT
                ========================= */}

                <div className="admin-section">

                  <h3>
                    Staff Assignment
                  </h3>

                  {assignedStaffMember ? (

                    <p>
                      <strong>
                        Assigned Staff:
                      </strong>{" "}
                      {assignedStaffMember.fullName}
                    </p>

                  ) : booking.assignedStaff ? (

                    <p>
                      <strong>
                        Assigned Staff ID:
                      </strong>{" "}
                      {booking.assignedStaff}
                    </p>

                  ) : (

                    <p>
                      <strong>
                        No staff assigned
                      </strong>
                    </p>

                  )}


                  <select
                    value={
                      staffInput[booking.id] || ""
                    }
                    onChange={(e) =>
                      setStaffInput((previous) => ({
                        ...previous,
                        [booking.id]:
                          e.target.value,
                      }))
                    }
                    disabled={
                      currentStatus === "CANCELLED" ||
                      currentStatus === "COMPLETED"
                    }
                  >

                    <option value="">
                      Select Staff
                    </option>

                    {staff.map((member) => (

                      <option
                        key={member.staffId}
                        value={member.staffId}
                        disabled={
                          member.availabilityStatus !==
                          "AVAILABLE"
                        }
                      >
                        {member.fullName} -{" "}
                        {member.availabilityStatus}
                      </option>

                    ))}

                  </select>


                  <button
                    className="assign-staff-btn"
                    onClick={() =>
                      assignStaff(booking.id)
                    }
                    disabled={
                      currentStatus === "CANCELLED" ||
                      currentStatus === "COMPLETED"
                    }
                  >
                    Assign Staff
                  </button>

                </div>


                {/* =========================
                    RESCHEDULE
                ========================= */}

                <div className="admin-section">

                  <h3>
                    Reschedule Booking
                  </h3>

                  <input
                    type="date"
                    value={
                      dateInput[booking.id] ||
                      booking.bookingDate ||
                      ""
                    }
                    onChange={(e) =>
                      setDateInput((previous) => ({
                        ...previous,
                        [booking.id]:
                          e.target.value,
                      }))
                    }
                  />

                  <input
                    type="time"
                    value={
                      timeInput[booking.id] ||
                      booking.bookingTime ||
                      ""
                    }
                    onChange={(e) =>
                      setTimeInput((previous) => ({
                        ...previous,
                        [booking.id]:
                          e.target.value,
                      }))
                    }
                  />

                  <button
                    className="reschedule-btn"
                    onClick={() =>
                      rescheduleBooking(
                        booking.id
                      )
                    }
                    disabled={
                      currentStatus === "CANCELLED" ||
                      currentStatus === "COMPLETED"
                    }
                  >
                    Reschedule
                  </button>

                </div>


                {/* =========================
                    INSTRUCTIONS
                ========================= */}

                {booking.additionalInstructions && (

                  <div className="admin-instructions">

                    <strong>
                      Additional Instructions:
                    </strong>

                    <p>
                      {booking.additionalInstructions}
                    </p>

                  </div>

                )}


                {/* =========================
                    ACTION BUTTONS
                ========================= */}

                <div className="admin-booking-actions">

                  <button
                    className="confirm-booking-btn"
                    onClick={() =>
                      confirmBooking(
                        booking.id
                      )
                    }
                    disabled={
                      currentStatus !== "PENDING"
                    }
                  >
                    Approve
                  </button>


                  <button
                    className="start-service-btn"
                    onClick={() =>
                      startService(
                        booking.id
                      )
                    }
                    disabled={
                      currentStatus !== "ASSIGNED"
                    }
                  >
                    Start Service
                  </button>


                  <button
                    className="complete-service-btn"
                    onClick={() =>
                      completeService(
                        booking.id
                      )
                    }
                    disabled={
                      currentStatus !==
                      "IN PROGRESS"
                    }
                  >
                    Mark Completed
                  </button>


                  <button
                    className="cancel-booking-btn"
                    onClick={() =>
                      cancelBooking(
                        booking.id
                      )
                    }
                    disabled={
                      currentStatus ===
                        "CANCELLED" ||
                      currentStatus ===
                        "COMPLETED"
                    }
                  >
                    Cancel
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

export default AdminBookingManagement;