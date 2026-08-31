import { useState } from "react";
import Payment from "./Payment";

function BookingForm({ service, onBack, onPaymentSuccess }) {
  const [showPayment, setShowPayment] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",
    brand: "",
    model: "",
    bookingDate: "",
    bookingTime: "",
    serviceLocation: "Service Center",
    pickupDrop: false,
    additionalInstructions: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const serviceCost = Number(service?.price || 0);

  const additionalCharges = formData.pickupDrop ? 100 : 0;

  const subtotal = serviceCost + additionalCharges;

  const gst = subtotal * 0.18;

  const totalAmount = subtotal + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");

    // Get logged-in customer
    const storedCustomer = localStorage.getItem("customer");

    if (!storedCustomer) {
      setMessage("Please login as a customer before booking a service.");
      setIsSubmitting(false);
      return;
    }

    let customer;

    try {
      customer = JSON.parse(storedCustomer);
    } catch (error) {
      console.error("Customer data error:", error);
      setMessage("Invalid customer login data. Please login again.");
      setIsSubmitting(false);
      return;
    }

    const customerId = customer?.id;

    if (!customerId) {
      console.error("Customer ID not found:", customer);
      setMessage("Customer ID not found. Please login again.");
      setIsSubmitting(false);
      return;
    }

    const bookingData = {
      customerId: Number(customerId),

      vehicleId: 1,

      serviceId: service.id,

      serviceName: service.name,

      bookingDate: formData.bookingDate,

      bookingTime: formData.bookingTime,

      serviceLocation: formData.serviceLocation,

      amount: serviceCost,

      serviceCost: serviceCost,

      additionalCharges: additionalCharges,

      gst: gst,

      totalAmount: totalAmount,

      pickupDrop: formData.pickupDrop,

      additionalInstructions: formData.additionalInstructions,

      bookingStatus: "PENDING",

      status: "Pending",
    };

    console.log("Logged-in Customer ID:", customerId);
    console.log("Booking Data:", bookingData);

    try {
      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Booking could not be created"
        );
      }

      const data = await response.json();

      console.log("Booking created:", data);

      setCreatedBooking(data);

      setShowPayment(true);
    } catch (error) {
      console.error("Booking error:", error);

      setMessage(
        error.message ||
          "Unable to create booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPayment && createdBooking) {
    return (
      <Payment
        booking={createdBooking}
        onPaymentSuccess={(payment) => {
          console.log("Payment completed:", payment);

          if (onPaymentSuccess) {
            onPaymentSuccess(payment);
          }
        }}
        onBack={() => {
          setShowPayment(false);
        }}
      />
    );
  }

  return (
    <div
      className="booking-container"
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background:
          "linear-gradient(135deg, #eef2ff, #fdf2f8, #ecfeff)",
      }}
    >
      <button
        className="back-btn"
        onClick={onBack}
        type="button"
        style={{
          marginBottom: "25px",
          padding: "12px 22px",
          border: "none",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        ← Back to Service
      </button>

      <div
        className="booking-card"
        style={{
          maxWidth: "950px",
          margin: "auto",
          padding: "35px",
          background: "white",
          borderRadius: "25px",
          boxShadow: "0 20px 50px rgba(79,70,229,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            background:
              "linear-gradient(90deg, #4f46e5, #db2777, #0891b2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "25px",
          }}
        >
          Book Your Car Wash
        </h1>

        <div
          className="selected-service"
          style={{
            padding: "25px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, #eef2ff, #f5f3ff, #fce7f3)",
            borderLeft: "5px solid #6366f1",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ color: "#312e81" }}>
            {service.name}
          </h2>

          <p style={{ color: "#64748b" }}>
            {service.description}
          </p>

          <strong
            style={{
              color: "#db2777",
              fontSize: "18px",
            }}
          >
            ₹{service.price} • {service.duration} Minutes
          </strong>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 style={{ color: "#312e81" }}>
            Vehicle Details
          </h2>

          <div className="booking-grid">
            <div>
              <label>Vehicle Type</label>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="MUV">MUV</option>
              </select>
            </div>

            <div>
              <label>Vehicle Number</label>

              <input
                type="text"
                name="vehicleNumber"
                placeholder="e.g. MP04AB1234"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Brand</label>

              <input
                type="text"
                name="brand"
                placeholder="e.g. Hyundai"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Model</label>

              <input
                type="text"
                name="model"
                placeholder="e.g. Creta"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h2 style={{ color: "#312e81", marginTop: "30px" }}>
            Booking Schedule
          </h2>

          <div className="booking-grid">
            <div>
              <label>Preferred Date</label>

              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Preferred Time</label>

              <input
                type="time"
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h2 style={{ color: "#312e81", marginTop: "30px" }}>
            Service Location
          </h2>

          <div className="location-options">
            <label>
              <input
                type="radio"
                name="serviceLocation"
                value="Service Center"
                checked={
                  formData.serviceLocation === "Service Center"
                }
                onChange={handleChange}
              />
              Service Center
            </label>

            <label>
              <input
                type="radio"
                name="serviceLocation"
                value="Home"
                checked={formData.serviceLocation === "Home"}
                onChange={handleChange}
              />
              Home Service
            </label>
          </div>

          <h2 style={{ color: "#312e81", marginTop: "30px" }}>
            Additional Options
          </h2>

          <label className="pickup-option">
            <input
              type="checkbox"
              name="pickupDrop"
              checked={formData.pickupDrop}
              onChange={handleChange}
            />
            Pickup & Drop (+₹100)
          </label>

          <label>Additional Instructions</label>

          <textarea
            name="additionalInstructions"
            placeholder="Any special instructions..."
            value={formData.additionalInstructions}
            onChange={handleChange}
          />

          <div
            className="price-summary"
            style={{
              marginTop: "30px",
              padding: "25px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, #eef2ff, #ecfeff)",
              border: "1px solid #c7d2fe",
            }}
          >
            <h2 style={{ color: "#312e81" }}>
              Price Summary
            </h2>

            <div>
              <span>Service Cost</span>

              <strong>
                ₹{serviceCost.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>Additional Charges</span>

              <strong>
                ₹{additionalCharges.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>GST (18%)</span>

              <strong>
                ₹{gst.toFixed(2)}
              </strong>
            </div>

            <hr />

            <div className="total-row">
              <span>Total Amount</span>

              <strong
                style={{
                  color: "#db2777",
                  fontSize: "24px",
                }}
              >
                ₹{totalAmount.toFixed(2)}
              </strong>
            </div>
          </div>

          <button
            type="submit"
            className="confirm-booking-btn"
            disabled={isSubmitting}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "16px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(90deg, #4f46e5, #7c3aed, #db2777)",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: isSubmitting
                ? "not-allowed"
                : "pointer",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting
              ? "Creating Booking..."
              : "Continue to Payment"}
          </button>
        </form>

        {message && (
          <div
            className="booking-message error"
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "12px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;