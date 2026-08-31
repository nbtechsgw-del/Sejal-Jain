import { useState } from "react";

function Payment({ booking, onPaymentSuccess, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const amount = Number(booking?.totalAmount || 0);

  const handlePayment = async () => {
    if (!booking?.id) {
      setMessage("Booking information is missing.");
      return;
    }

    if (isProcessing || paymentSuccess) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    const paymentRequest = {
      bookingId: booking.id,
      paymentMethod: paymentMethod,
      amount: amount,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentRequest),
        }
      );

      console.log("Payment response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Payment failed");
      }

      const result = await response.json();

      console.log("Payment successful:", result);

      setPaymentData(result);
      setPaymentSuccess(true);

    } catch (error) {
      console.error("Payment error:", error);

      setMessage(
        error.message ||
        "Payment could not be completed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewBookings = () => {
    console.log("View My Bookings clicked");

    if (onPaymentSuccess) {
      onPaymentSuccess(paymentData);
    }
  };

  return (
    <div className="payment-container">

      <div className="payment-card">

        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          disabled={isProcessing || paymentSuccess}
        >
          ← Back
        </button>

        <h1>Payment</h1>

        {!paymentSuccess ? (

          <>
            <div className="payment-summary">

              <h2>Booking Summary</h2>

              <div>
                <span>Service</span>

                <strong>
                  {booking?.serviceName ||
                    "Car Wash Service"}
                </strong>
              </div>

              <div>
                <span>Booking Date</span>

                <strong>
                  {booking?.bookingDate}
                </strong>
              </div>

              <div>
                <span>Booking Time</span>

                <strong>
                  {booking?.bookingTime}
                </strong>
              </div>

              <hr />

              <div className="payment-total">

                <span>Total Amount</span>

                <strong>
                  ₹{amount.toFixed(2)}
                </strong>

              </div>

            </div>

            <h2>Select Payment Method</h2>

            <div className="payment-methods">

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                UPI
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CREDIT_CARD"
                  checked={
                    paymentMethod === "CREDIT_CARD"
                  }
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Credit Card
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="DEBIT_CARD"
                  checked={
                    paymentMethod === "DEBIT_CARD"
                  }
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Debit Card
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="NET_BANKING"
                  checked={
                    paymentMethod === "NET_BANKING"
                  }
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Net Banking
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CASH_ON_SERVICE"
                  checked={
                    paymentMethod === "CASH_ON_SERVICE"
                  }
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Cash on Service
              </label>

            </div>

            <button
              type="button"
              className="pay-now-btn"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing Payment..."
                : `Pay ₹${amount.toFixed(2)}`}
            </button>

          </>

        ) : (

          <div className="payment-success">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Payment Successful!
            </h2>

            <p>
              Your payment has been completed successfully.
            </p>

            <p>
              Your booking has been confirmed.
            </p>

            <div className="transaction-details">

              <p>
                <strong>Booking ID:</strong>{" "}
                {booking?.id}
              </p>

              <p>
                <strong>Payment ID:</strong>{" "}
                {paymentData?.paymentId}
              </p>

              <p>
                <strong>Transaction ID:</strong>{" "}
                {paymentData?.transactionId}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {paymentData?.paymentMethod}
              </p>

              <p>
                <strong>Amount Paid:</strong>{" "}
                ₹
                {Number(
                  paymentData?.amount || 0
                ).toFixed(2)}
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                {paymentData?.paymentStatus}
              </p>

            </div>

            <button
              type="button"
              className="view-bookings-btn"
              onClick={handleViewBookings}
            >
              View My Bookings
            </button>

          </div>

        )}

        {message && !paymentSuccess && (
          <div className="payment-message">
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default Payment;