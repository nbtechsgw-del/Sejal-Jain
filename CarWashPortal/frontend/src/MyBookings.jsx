import { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloadingInvoice, setDownloadingInvoice] = useState(null);
  const [error, setError] = useState("");

  // =========================
  // FETCH BOOKINGS + PAYMENTS
  // =========================

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        // =========================
        // GET LOGGED-IN CUSTOMER
        // =========================

        const storedCustomer =
          localStorage.getItem("customer");

        if (!storedCustomer) {
          setError(
            "Customer login required. Please login again."
          );
          setLoading(false);
          return;
        }

        let customer;

        try {
          customer = JSON.parse(storedCustomer);
        } catch (error) {
          console.error(
            "Customer data error:",
            error
          );

          setError(
            "Invalid customer login data. Please login again."
          );

          setLoading(false);
          return;
        }

        const customerId = customer?.id;

        if (!customerId) {
          console.error(
            "Customer ID not found:",
            customer
          );

          setError(
            "Customer ID not found. Please login again."
          );

          setLoading(false);
          return;
        }

        console.log(
          "Logged-in Customer ID:",
          customerId
        );

        // =========================
        // FETCH CUSTOMER BOOKINGS
        // =========================

        const response = await fetch(
          `http://localhost:8080/api/customers/${customerId}/bookings`
        );

        console.log(
          "Booking response status:",
          response.status
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch bookings"
          );
        }

        const data = await response.json();

        console.log(
          "BOOKINGS FROM BACKEND:",
          data
        );

        setBookings(data);

        // =========================
        // FETCH PAYMENTS
        // =========================

        const paymentDetails = {};

        for (const booking of data) {
          try {
            const paymentResponse =
              await fetch(
                `http://localhost:8080/api/payments/booking/${booking.id}`
              );

            if (paymentResponse.ok) {
              const paymentData =
                await paymentResponse.json();

              console.log(
                `Payment for booking ${booking.id}:`,
                paymentData
              );

              if (
                Array.isArray(paymentData) &&
                paymentData.length > 0
              ) {
                paymentDetails[booking.id] =
                  paymentData[0];
              }
            }
          } catch (error) {
            console.error(
              `Payment fetch error for booking ${booking.id}:`,
              error
            );
          }
        }

        setPayments(paymentDetails);

      } catch (error) {
        console.error(
          "BOOKING ERROR:",
          error
        );

        setError(
          error.message ||
            "Unable to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // =========================
  // CANCEL BOOKING
  // =========================

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(
          data || "Failed to cancel booking."
        );
      }

      alert(
        "Booking cancelled successfully!"
      );

      setBookings(
        (previousBookings) =>
          previousBookings.map(
            (booking) =>
              booking.id === bookingId
                ? {
                    ...booking,
                    bookingStatus:
                      "CANCELLED",
                    status: "CANCELLED",
                  }
                : booking
          )
      );
    } catch (error) {
      console.error(
        "CANCEL BOOKING ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to cancel booking."
      );
    }
  };

  // =========================
  // DOWNLOAD INVOICE
  // =========================

  const handleDownloadInvoice = async (
    bookingId
  ) => {
    try {
      setDownloadingInvoice(bookingId);

      console.log(
        "Downloading invoice for booking:",
        bookingId
      );

      const response = await fetch(
        `http://localhost:8080/api/invoices/booking/${bookingId}`
      );

      console.log(
        "Invoice response status:",
        response.status
      );

      if (!response.ok) {
        const errorText =
          await response.text();

        console.error(
          "Invoice backend error:",
          errorText
        );

        throw new Error(
          "Unable to download invoice."
        );
      }

      const blob =
        await response.blob();

      if (
        !blob ||
        blob.size === 0
      ) {
        throw new Error(
          "Invoice file is empty."
        );
      }

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `invoice-${bookingId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "INVOICE DOWNLOAD ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to download invoice."
      );
    } finally {
      setDownloadingInvoice(null);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="bookings-page">
        <div className="bookings-loading">

          <div className="booking-spinner"></div>

          <h2>
            Loading Your Bookings...
          </h2>

          <p>
            Please wait while we fetch
            your booking details.
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
      <div className="bookings-page">

        <div
          className="empty-bookings"
          style={{
            maxWidth: "600px",
            margin: "80px auto",
            padding: "40px",
            textAlign: "center",
            background: "white",
            borderRadius: "20px",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >

          <div
            style={{
              fontSize: "50px",
              marginBottom: "15px",
            }}
          >
            ⚠️
          </div>

          <h2>
            Unable to Load Bookings
          </h2>

          <p
            style={{
              color: "#dc2626",
              marginTop: "10px",
            }}
          >
            {error}
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // MAIN PAGE
  // =========================

  return (
    <div className="bookings-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="bookings-header">

        <div>

          <span className="bookings-label">
            CUSTOMER PORTAL
          </span>

          <h1>
            My Bookings
          </h1>

          <p>
            View your car wash appointments
            and payment details.
          </p>

        </div>

        <div className="booking-count">

          <span>
            Total Bookings
          </span>

          <strong>
            {bookings.length}
          </strong>

        </div>

      </section>


      {/* =========================
          BOOKINGS SECTION
      ========================= */}

      <section className="bookings-section">

        {bookings.length === 0 ? (

          <div className="empty-bookings">

            <div className="empty-icon">
              🚗
            </div>

            <h2>
              No Bookings Yet
            </h2>

            <p>
              You haven't made any car wash
              bookings yet.
            </p>

          </div>

        ) : (

          <div className="booking-list">

            {bookings.map((booking) => {

              const payment =
                payments[booking.id];

              // =========================
              // CANCEL CONDITION
              // =========================

              const bookingStatus =
                booking.bookingStatus?.toUpperCase();

              const canCancel =
                bookingStatus === "PENDING" ||
                bookingStatus === "CONFIRMED";

              // =========================
              // INVOICE CONDITION
              // =========================

              const paymentStatus =
                payment?.paymentStatus?.toUpperCase();

              const canDownloadInvoice =
                payment &&
                paymentStatus === "SUCCESS";

              return (

                <div
                  className="booking-card"
                  key={booking.id}
                >

                  {/* =========================
                      BOOKING HEADER
                  ========================= */}

                  <div className="booking-card-header">

                    <div>

                      <span className="booking-id">
                        BOOKING #{booking.id}
                      </span>

                      <h2>
                        {booking.serviceName}
                      </h2>

                    </div>

                    <span
                      className={`booking-status ${
                        booking.bookingStatus
                          ?.toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>

                  </div>


                  {/* =========================
                      BOOKING DETAILS
                  ========================= */}

                  <div className="booking-details">

                    <div className="booking-detail">

                      <span className="detail-icon">
                        📅
                      </span>

                      <div>

                        <small>
                          Booking Date
                        </small>

                        <strong>
                          {booking.bookingDate}
                        </strong>

                      </div>

                    </div>


                    <div className="booking-detail">

                      <span className="detail-icon">
                        ⏰
                      </span>

                      <div>

                        <small>
                          Booking Time
                        </small>

                        <strong>
                          {booking.bookingTime}
                        </strong>

                      </div>

                    </div>


                    <div className="booking-detail">

                      <span className="detail-icon">
                        📍
                      </span>

                      <div>

                        <small>
                          Service Location
                        </small>

                        <strong>
                          {booking.serviceLocation}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* =========================
                      PRICE SECTION
                  ========================= */}

                  <div className="price-section">

                    <h3>
                      Booking Summary
                    </h3>

                    <div className="price-row">

                      <span>
                        Service Cost
                      </span>

                      <strong>
                        ₹
                        {Number(
                          booking.serviceCost || 0
                        ).toFixed(2)}
                      </strong>

                    </div>


                    <div className="price-row">

                      <span>
                        Additional Charges
                      </span>

                      <strong>
                        ₹
                        {Number(
                          booking.additionalCharges || 0
                        ).toFixed(2)}
                      </strong>

                    </div>


                    <div className="price-row">

                      <span>
                        GST
                      </span>

                      <strong>
                        ₹
                        {Number(
                          booking.gst || 0
                        ).toFixed(2)}
                      </strong>

                    </div>


                    <div className="price-divider"></div>


                    <div className="total-row">

                      <span>
                        Total Amount
                      </span>

                      <strong>
                        ₹
                        {Number(
                          booking.totalAmount || 0
                        ).toFixed(2)}
                      </strong>

                    </div>

                  </div>


                  {/* =========================
                      PAYMENT SECTION
                  ========================= */}

                  <div className="payment-section">

                    <div className="payment-heading">

                      <h3>
                        Payment Details
                      </h3>

                      {payment && (

                        <span
                          className={
                            paymentStatus ===
                            "SUCCESS"
                              ? "payment-success"
                              : "payment-failed"
                          }
                        >
                          {payment.paymentStatus}
                        </span>

                      )}

                    </div>


                    {payment ? (

                      <div className="payment-grid">

                        <div>

                          <small>
                            Payment ID
                          </small>

                          <strong>
                            {payment.paymentId}
                          </strong>

                        </div>


                        <div>

                          <small>
                            Transaction ID
                          </small>

                          <strong>
                            {payment.transactionId ||
                              "N/A"}
                          </strong>

                        </div>


                        <div>

                          <small>
                            Payment Method
                          </small>

                          <strong>
                            {payment.paymentMethod}
                          </strong>

                        </div>


                        <div>

                          <small>
                            Amount Paid
                          </small>

                          <strong>
                            ₹
                            {Number(
                              payment.amount || 0
                            ).toFixed(2)}
                          </strong>

                        </div>


                        <div>

                          <small>
                            Payment Date
                          </small>

                          <strong>
                            {payment.paymentDate ||
                              "N/A"}
                          </strong>

                        </div>

                      </div>

                    ) : (

                      <div className="no-payment">

                        Payment details are
                        not available yet.

                      </div>

                    )}

                  </div>


                  {/* =========================
                      ACTION BUTTONS
                  ========================= */}

                  {(canCancel ||
                    canDownloadInvoice) && (

                    <div className="booking-actions">

                      {/* CANCEL BUTTON */}

                      {canCancel && (

                        <button
                          type="button"
                          className="cancel-booking-btn"
                          onClick={() =>
                            handleCancelBooking(
                              booking.id
                            )
                          }
                        >
                          Cancel Booking
                        </button>

                      )}


                      {/* INVOICE BUTTON */}

                      {canDownloadInvoice && (

                        <button
                          type="button"
                          className="download-invoice-btn"
                          onClick={() =>
                            handleDownloadInvoice(
                              booking.id
                            )
                          }
                          disabled={
                            downloadingInvoice ===
                            booking.id
                          }
                        >

                          {downloadingInvoice ===
                          booking.id
                            ? "⏳ Downloading..."
                            : "📄 Download Invoice"}

                        </button>

                      )}

                    </div>

                  )}

                </div>

              );
            })}

          </div>

        )}

      </section>

    </div>
  );
}

export default MyBookings;