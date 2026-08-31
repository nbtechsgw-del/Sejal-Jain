import "./Home.css";

function Home({
  onCustomerLogin,
  onCustomerRegister,
  onAdminLogin,
  onAdminRegister
}) {

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="home-navbar">

        <div className="home-logo">
          <span className="logo-icon">🚗</span>

          <div>
            <h2>CarWash</h2>
            <span>Portal</span>
          </div>
        </div>


        <div className="home-nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#services">
            Services
          </a>

          <a href="#about">
            About
          </a>

          <div className="nav-auth-buttons">

            <button
              className="customer-nav-btn"
              onClick={onCustomerLogin}
            >
              Customer Login
            </button>

            <button
              className="admin-nav-btn"
              onClick={onAdminLogin}
            >
              Admin Login
            </button>

          </div>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section
        className="hero-section"
        id="home"
      >

        <div className="hero-content">

          <span className="hero-badge">
            🚘 Professional Car Care
          </span>

          <h1>
            Give Your Car
            <br />
            <span>A Fresh New Look</span>
          </h1>

          <p>
            Book professional car wash and detailing
            services quickly and easily with CarWash Portal.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={onCustomerLogin}
            >
              Book a Car Wash
            </button>

            <button
              className="secondary-btn"
              onClick={onCustomerRegister}
            >
              Create Account
            </button>

          </div>

        </div>


        <div className="hero-image">

          <div className="car-illustration">
            🚗
          </div>

          <div className="water-drop drop-one">
            💧
          </div>

          <div className="water-drop drop-two">
            💦
          </div>

          <div className="water-drop drop-three">
            💧
          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section
        className="services-section"
        id="services"
      >

        <div className="section-heading">

          <span>
            OUR SERVICES
          </span>

          <h2>
            Professional Car Wash Services
          </h2>

          <p>
            Choose from our range of reliable car care services.
          </p>

        </div>


        <div className="service-cards">


          <div className="home-service-card">

            <div className="service-icon">
              🚿
            </div>

            <h3>
              Basic Wash
            </h3>

            <p>
              Exterior cleaning and quick car wash
              for your everyday needs.
            </p>

          </div>


          <div className="home-service-card featured-service">

            <div className="service-icon">
              ✨
            </div>

            <h3>
              Premium Wash
            </h3>

            <p>
              Complete exterior and interior cleaning
              with premium care.
            </p>

          </div>


          <div className="home-service-card">

            <div className="service-icon">
              🧽
            </div>

            <h3>
              Complete Detailing
            </h3>

            <p>
              Deep cleaning and professional detailing
              for your vehicle.
            </p>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <span>
            WHY CHOOSE US
          </span>

          <h2>
            Everything Your Car Needs
            <br />
            In One Place
          </h2>

          <p>
            CarWash Portal makes it easy to find services,
            book appointments and manage your car wash
            bookings from one convenient platform.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-item">

            <span>📅</span>

            <div>
              <h3>
                Easy Booking
              </h3>

              <p>
                Book your preferred service easily.
              </p>
            </div>

          </div>


          <div className="feature-item">

            <span>⚡</span>

            <div>
              <h3>
                Quick Service
              </h3>

              <p>
                Save time with scheduled appointments.
              </p>
            </div>

          </div>


          <div className="feature-item">

            <span>💳</span>

            <div>
              <h3>
                Easy Payments
              </h3>

              <p>
                Simple and convenient payment process.
              </p>
            </div>

          </div>


          <div className="feature-item">

            <span>⭐</span>

            <div>
              <h3>
                Quality Service
              </h3>

              <p>
                Professional care for your vehicle.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <h2>
          Ready to Give Your Car Some Care?
        </h2>

        <p>
          Create your account and book your car wash today.
        </p>

        <button
          onClick={onCustomerRegister}
        >
          Get Started
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div>

          <h3>
            🚗 CarWash Portal
          </h3>

          <p>
            Smart and simple car wash management.
          </p>

        </div>


        <div className="footer-links">

          <button onClick={onCustomerLogin}>
            Customer Login
          </button>

          <button onClick={onCustomerRegister}>
            Customer Register
          </button>

          <button onClick={onAdminLogin}>
            Admin Login
          </button>

          <button onClick={onAdminRegister}>
            Admin Register
          </button>

        </div>

      </footer>

    </div>
  );
}

export default Home;