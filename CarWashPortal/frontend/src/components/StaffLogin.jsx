import { useState } from "react";
import "./StaffLogin.css";

function StaffLogin({ onLogin, onNavigate }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/staff/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      console.log("Staff Login:", data);

      localStorage.setItem(
        "staff",
        JSON.stringify(data)
      );

      if (onLogin) {
        onLogin(data);
      }

    } catch (error) {

      console.error("Staff login error:", error);

      alert(
        error.message || "Unable to login."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="staff-login-page">

      <div className="staff-login-card">

        <button
          type="button"
          className="back-dashboard-btn"
          onClick={() => {
            if (onNavigate) {
              onNavigate("admin-dashboard");
            }
          }}
        >
          ← Back to Dashboard
        </button>

        <div className="staff-login-icon">
          👨‍🔧
        </div>

        <h1>Staff Login</h1>

        <p>
          Login to view your assigned bookings
        </p>

        <form onSubmit={handleSubmit}>

          <div className="staff-login-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="staff-login-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="staff-login-submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Staff Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default StaffLogin;