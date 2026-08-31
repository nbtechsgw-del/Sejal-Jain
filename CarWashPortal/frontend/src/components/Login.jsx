import { useState } from "react";
import "./Login.css";

function Login({
  onLoginSuccess,
  onRegister,
  onBackHome
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError(
        "Please enter email and password."
      );

      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/customers/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Invalid email or password."
        );

      }


      console.log(
        "Customer Login:",
        data
      );


      localStorage.setItem(
        "customer",
        JSON.stringify(data)
      );


      alert(
        "Login successful!"
      );


      if (onLoginSuccess) {

        onLoginSuccess(data);

      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      setError(
        error.message ||
        "Login failed."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="customer-auth-page">


      {/* LEFT PANEL */}

      <div className="auth-brand-panel">

        <div className="brand-content">

          <div className="brand-logo">

            <span className="brand-car">
              🚗
            </span>

            <div>

              <h2>
                CarWash
              </h2>

              <span>
                PORTAL
              </span>

            </div>

          </div>


          <div className="brand-main">

            <span className="brand-badge">
              ✨ PREMIUM CAR CARE
            </span>

            <h1>

              Your Car Deserves

              <br />

              <span>
                Better Care.
              </span>

            </h1>

            <p>

              Book professional car wash and detailing
              services anytime, anywhere.

            </p>

          </div>


          <div className="brand-features">

            <div className="brand-feature">

              <span>✓</span>

              <p>
                Easy online booking
              </p>

            </div>


            <div className="brand-feature">

              <span>✓</span>

              <p>
                Professional car care
              </p>

            </div>


            <div className="brand-feature">

              <span>✓</span>

              <p>
                Manage your bookings easily
              </p>

            </div>

          </div>

        </div>


        <div className="brand-car-visual">

          <div className="car-circle">
            🚘
          </div>

          <span className="water-drop water-1">
            💧
          </span>

          <span className="water-drop water-2">
            💦
          </span>

          <span className="water-drop water-3">
            💧
          </span>

        </div>

      </div>


      {/* RIGHT PANEL */}

      <div className="auth-form-panel">

        <div className="login-form-container">


          {/* BACK */}

          <div className="auth-top">

            <button
              type="button"
              className="back-home-btn"
              onClick={onBackHome}
            >
              ← Back to Home
            </button>

          </div>


          {/* HEADING */}

          <div className="auth-heading">

            <div className="auth-icon">
              👤
            </div>

            <h1>
              Welcome Back!
            </h1>

            <p>
              Sign in to continue to your account
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="auth-error">

              <span>!</span>

              <p>
                {error}
              </p>

            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >


            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>


              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>


                <input
                  type="email"
                  value={email}

                  onChange={(e) => {

                    setEmail(
                      e.target.value
                    );

                    setError("");

                  }}

                  placeholder="you@example.com"

                  autoComplete="email"

                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">


              <div className="password-label-row">

                <label>
                  Password
                </label>


                <button
                  type="button"
                  className="forgot-btn"

                  onClick={() => {

                    alert(
                      "Please contact support to reset your password."
                    );

                  }}

                >

                  Forgot Password?

                </button>

              </div>


              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>


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

                  placeholder="Enter your password"

                  autoComplete="current-password"

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
                    : "👁"}

                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button

              type="submit"

              disabled={loading}

              className="login-submit-btn"

            >

              {loading ? (

                <>

                  <span className="loading-spinner">
                  </span>

                  Logging in...

                </>

              ) : (

                <>

                  Login

                  <span>
                    →
                  </span>

                </>

              )}

            </button>

          </form>


          {/* DIVIDER */}

          <div className="auth-divider">

            <span></span>

            <p>
              New to CarWash Portal?
            </p>

            <span></span>

          </div>


          {/* REGISTER */}

          <button

            type="button"

            onClick={onRegister}

            className="create-account-btn"

          >

            Create New Account

          </button>


          {/* SECURITY */}

          <p className="auth-security-text">

            🔒 Your information is securely protected

          </p>


        </div>

      </div>

    </div>

  );

}

export default Login;