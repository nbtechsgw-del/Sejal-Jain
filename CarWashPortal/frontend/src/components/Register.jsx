 import { useState } from "react";
import "./Register.css";

function Register({
  onRegisterSuccess,
  onBackToLogin
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!name || !email || !phone || !password) {

      setError(
        "Please fill all fields."
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/customers",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            password
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Registration failed"
        );

      }


      alert(
        "Registration successful! Please login."
      );


      if (onRegisterSuccess) {

        onRegisterSuccess(data);

      }

    } catch (error) {

      console.error(
        "Registration error:",
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

    <div className="auth-page">


      {/* ================= LEFT BRANDING ================= */}

      <div className="auth-left">

        <div className="auth-left-content">


          <div className="auth-logo">

            <div className="auth-logo-icon">
              🚗
            </div>

            <div>

              <h2>
                CarWash Portal
              </h2>

              <p>
                Smart Car Care Management
              </p>

            </div>

          </div>


          <h1>

            Start Your

            <br />

            <span>
              Car Care Journey.
            </span>

          </h1>


          <p className="auth-left-description">

            Create your account and enjoy easy booking,
            professional car wash services and convenient
            appointment management.

          </p>


          <div className="auth-features">


            <div className="auth-feature">

              <div className="auth-feature-icon">
                🚘
              </div>

              <div className="auth-feature-text">

                <h4>
                  Professional Car Care
                </h4>

                <p>
                  Quality services for your vehicle.
                </p>

              </div>

            </div>


            <div className="auth-feature">

              <div className="auth-feature-icon">
                📅
              </div>

              <div className="auth-feature-text">

                <h4>
                  Easy Booking
                </h4>

                <p>
                  Schedule your service in seconds.
                </p>

              </div>

            </div>


            <div className="auth-feature">

              <div className="auth-feature-icon">
                ⭐
              </div>

              <div className="auth-feature-text">

                <h4>
                  Better Experience
                </h4>

                <p>
                  Manage all your bookings in one place.
                </p>

              </div>

            </div>


          </div>

        </div>

      </div>


      {/* ================= RIGHT FORM ================= */}

      <div className="auth-right">

        <div className="auth-card">


          <button
            type="button"
            className="auth-back"
            onClick={onBackToLogin}
          >

            ← Back to Login

          </button>


          <div className="auth-title">

            <h2>
              Create Account ✨
            </h2>

            <p>

              Register as a customer to book
              car wash services.

            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="auth-error">

              {error}

            </div>

          )}


          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}

                onChange={(e) => {

                  setName(e.target.value);

                  setError("");

                }}

                placeholder="Enter your full name"
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}

                onChange={(e) => {

                  setEmail(e.target.value);

                  setError("");

                }}

                placeholder="you@example.com"
              />

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}

                onChange={(e) => {

                  setPhone(e.target.value);

                  setError("");

                }}

                placeholder="Enter your phone number"
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>


              <div className="password-wrapper">

                <input

                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  value={password}

                  onChange={(e) => {

                    setPassword(
                      e.target.value
                    );

                    setError("");

                  }}

                  placeholder="Create a password"

                />


                <button

                  type="button"

                  className="password-toggle"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }

                >

                  {showPassword
                    ? "🙈"
                    : "👁️"}

                </button>

              </div>

            </div>


            {/* REGISTER */}

            <button

              type="submit"

              disabled={loading}

              className="auth-btn"

            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>


          </form>


          {/* FOOTER */}

          <div className="auth-footer">

            <p>
              Already have an account?
            </p>

            <button

              type="button"

              onClick={onBackToLogin}

              className="link-btn"

            >

              Sign In

            </button>

          </div>


        </div>

      </div>

    </div>

  );

}

export default Register;