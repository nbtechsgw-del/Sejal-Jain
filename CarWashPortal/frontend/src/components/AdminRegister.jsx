import { useState } from "react";
import "./AdminRegister.css";

function AdminRegister({ onRegisterSuccess, onBackToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/admin/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      alert("Admin registration successful!");

      if (onRegisterSuccess) {
        onRegisterSuccess(data);
      }

    } catch (error) {

      console.error(
        "Admin registration error:",
        error
      );

      setError(
        error.message ||
        "Unable to register."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="admin-register-page">

      {/* =========================================
          LEFT SECTION
      ========================================= */}

      <div className="admin-register-left">

        <div className="admin-register-left-content">

          {/* LOGO */}

          <div className="admin-register-logo">

            <div className="admin-register-logo-icon">
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
            Build a Better
            <br />
            <span>Car Wash Experience</span>
          </h1>


          <p className="admin-register-description">
            Create your administrator account and get
            complete control over your car wash portal.
          </p>


          {/* FEATURES */}

          <div className="admin-register-features">

            <div className="admin-register-feature">

              <div className="admin-register-feature-icon">
                👥
              </div>

              <div>

                <h4>
                  Manage Customers
                </h4>

                <p>
                  View and manage customer information.
                </p>

              </div>

            </div>


            <div className="admin-register-feature">

              <div className="admin-register-feature-icon">
                🚿
              </div>

              <div>

                <h4>
                  Manage Services
                </h4>

                <p>
                  Add and manage car wash services.
                </p>

              </div>

            </div>


            <div className="admin-register-feature">

              <div className="admin-register-feature-icon">
                📊
              </div>

              <div>

                <h4>
                  Monitor Operations
                </h4>

                <p>
                  Manage bookings and daily operations.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          RIGHT SECTION
      ========================================= */}

      <div className="admin-register-right">

        <div className="admin-register-card">

          {/* BACK */}

          <button
            type="button"
            className="admin-register-back"
            onClick={onBackToLogin}
          >
            ← Back to Login
          </button>


          {/* TITLE */}

          <div className="admin-register-title">

            <div className="admin-register-title-icon">
              🛡️
            </div>

            <div>

              <h2>
                Create Admin Account
              </h2>

              <p>
                Register to manage your car wash portal
              </p>

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="admin-register-error">
              {error}
            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="admin-register-form"
          >

            {/* NAME */}

            <div className="admin-register-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                className="admin-register-input"
              />

            </div>


            {/* EMAIL */}

            <div className="admin-register-form-group">

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
                className="admin-register-input"
              />

            </div>


            {/* PASSWORD */}

            <div className="admin-register-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create a strong password"
                className="admin-register-input"
              />

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="admin-register-submit"
            >

              {loading
                ? "Creating Account..."
                : "Create Admin Account"}

            </button>

          </form>


          {/* LOGIN */}

          <div className="admin-register-footer">

            <span>
              Already have an admin account?
            </span>

            <button
              type="button"
              onClick={onBackToLogin}
              className="admin-login-link"
            >
              Login
            </button>

          </div>


          {/* SECURITY */}

          <div className="admin-register-security">

            <span>
              🔒
            </span>

            <p>
              Your administrator information is securely protected.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminRegister;