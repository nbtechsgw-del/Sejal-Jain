import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onLogin, onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      console.log("Admin Login:", data);

      // Save admin session
      localStorage.setItem(
        "admin",
        JSON.stringify(data)
      );

      alert("Admin login successful!");

      if (onLogin) {
        onLogin(data);
      }

    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );

      setError(
        error.message ||
        "Unable to login."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="admin-login-page">

      {/* =========================================
          LEFT SECTION
      ========================================= */}

      <div className="admin-login-left">

        <div className="admin-login-left-content">

          {/* LOGO */}

          <div className="admin-login-logo">

            <div className="admin-logo-icon">
              🚗
            </div>

            <div>

              <h2>
                CarWash
              </h2>

              <span>
                PORTAL
              </span>

            </div>

          </div>


          {/* HEADING */}

          <h1>
            Manage Your
            <br />
            <span>Car Wash Business</span>
          </h1>


          <p className="admin-login-description">
            Access your administration panel to manage
            customers, services, bookings and staff from
            one powerful dashboard.
          </p>


          {/* FEATURES */}

          <div className="admin-login-features">

            <div className="admin-feature">

              <div className="admin-feature-icon">
                👥
              </div>

              <div>

                <h4>
                  Customer Management
                </h4>

                <p>
                  Manage customer accounts and information.
                </p>

              </div>

            </div>


            <div className="admin-feature">

              <div className="admin-feature-icon">
                📅
              </div>

              <div>

                <h4>
                  Booking Management
                </h4>

                <p>
                  Track and manage all car wash bookings.
                </p>

              </div>

            </div>


            <div className="admin-feature">

              <div className="admin-feature-icon">
                ⚙️
              </div>

              <div>

                <h4>
                  Service & Staff Management
                </h4>

                <p>
                  Control services, staff and operations.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          RIGHT SECTION
      ========================================= */}

      <div className="admin-login-right">

        <div className="admin-login-card">

          {/* BACK */}

          <button
            type="button"
            className="admin-back-btn"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>


          {/* TITLE */}

          <div className="admin-login-title">

            <div className="admin-title-icon">
              🔐
            </div>

            <div>

              <h2>
                Admin Login
              </h2>

              <p>
                Sign in to access your admin dashboard
              </p>

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="admin-login-error">
              {error}
            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="admin-login-form"
          >

            {/* EMAIL */}

            <div className="admin-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter admin email"
                className="admin-input"
              />

            </div>


            {/* PASSWORD */}

            <div className="admin-form-group">

              <div className="admin-password-label">

                <label>
                  Password
                </label>

              </div>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="admin-input"
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="admin-login-btn"
            >

              {loading
                ? "Logging in..."
                : "Login to Dashboard"}

            </button>

          </form>


          {/* REGISTER */}

          <div className="admin-login-footer">

            <span>
              Don't have an admin account?
            </span>

            <button
              type="button"
              onClick={onRegister}
              className="admin-register-link"
            >
              Create Admin Account
            </button>

          </div>


          {/* SECURITY */}

          <div className="admin-security-note">

            <span>
              🔒
            </span>

            <p>
              Your admin credentials are securely protected.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminLogin;