import { useEffect, useState } from "react";

import Home from "./components/Home";
import ServiceListing from "./ServiceListing";
import ServiceDetails from "./ServiceDetails";
import MyBookings from "./MyBookings";
import CustomerProfile from "./CustomerProfile";

import Login from "./components/Login";
import Register from "./components/Register";

import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import AdminDashboard from "./components/AdminDashboard";

import AdminServiceManagement from "./components/AdminServiceManagement";
import AdminStaffManagement from "./components/AdminStaffManagement";
import AdminBookingManagement from "./components/AdminBookingManagement";
import Reviews from "./components/Reviews";

import StaffLogin from "./components/StaffLogin";
import StaffDashboard from "./components/StaffDashboard";

import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [staffId, setStaffId] = useState(null);

  // ==========================================
  // PAGE NAVIGATION WITH BROWSER HISTORY
  // ==========================================

  const navigate = (newPage, serviceId = null) => {
    setPage(newPage);

    if (serviceId !== null) {
      setSelectedServiceId(serviceId);
    }

    window.history.pushState(
      {
        page: newPage,
        serviceId: serviceId
      },
      "",
      window.location.pathname
    );
  };

  // ==========================================
  // INITIAL PAGE + BROWSER BACK/FORWARD
  // ==========================================

  useEffect(() => {
    const currentState = window.history.state;

    if (!currentState || !currentState.page) {
      window.history.replaceState(
        {
          page: "home",
          serviceId: null
        },
        "",
        window.location.pathname
      );
    } else {
      setPage(currentState.page);

      if (currentState.serviceId) {
        setSelectedServiceId(currentState.serviceId);
      }
    }

    const handlePopState = (event) => {
      const state = event.state;

      if (state && state.page) {
        setPage(state.page);

        if (state.serviceId) {
          setSelectedServiceId(state.serviceId);
        } else {
          setSelectedServiceId(null);
        }
      } else {
        // If browser goes before our app history,
        // keep user on Home instead of leaving the SPA.
        setPage("home");
        setSelectedServiceId(null);

        window.history.replaceState(
          {
            page: "home",
            serviceId: null
          },
          "",
          window.location.pathname
        );
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  // ==========================================
  // CUSTOMER LOGIN
  // ==========================================

  const handleCustomerLogin = (data) => {
    localStorage.setItem(
      "customer",
      JSON.stringify(data)
    );

    navigate("services");
  };

  // ==========================================
  // CUSTOMER REGISTER
  // ==========================================

  const handleCustomerRegister = () => {
    navigate("login");
  };

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const handleAdminLogin = (data) => {
    localStorage.setItem(
      "admin",
      JSON.stringify(data)
    );

    navigate("admin-dashboard");
  };

  // ==========================================
  // ADMIN REGISTER
  // ==========================================

  const handleAdminRegister = () => {
    navigate("admin-login");
  };

  // ==========================================
  // STAFF LOGIN
  // ==========================================

  const handleStaffLogin = (data) => {
    console.log("STAFF LOGIN DATA:", data);

    localStorage.setItem(
      "staff",
      JSON.stringify(data)
    );

    const id =
      data?.id ||
      data?.staffId ||
      data?.staff?.id ||
      data?.staff?.staffId;

    console.log("STAFF ID:", id);

    setStaffId(id);

    navigate("staff-dashboard");
  };

  // ==========================================
  // OPEN SERVICE DETAILS
  // ==========================================

  const openServiceDetails = (id) => {
    setSelectedServiceId(id);

    navigate(
      "service-details",
      id
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("admin");
    localStorage.removeItem("staff");

    setSelectedServiceId(null);
    setStaffId(null);

    navigate("home");
  };

  // ==========================================
  // STAFF LOGOUT
  // ==========================================

  const staffLogout = () => {
    localStorage.removeItem("staff");

    setStaffId(null);

    navigate("home");
  };

  // ==========================================
  // CUSTOMER NAVBAR
  // ==========================================

  const customerLoggedIn =
    localStorage.getItem("customer");

  const showCustomerNavbar =
    !!customerLoggedIn &&
    (
      page === "services" ||
      page === "service-details" ||
      page === "my-bookings" ||
      page === "profile"
    );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="app">

      {/* =====================================
          HOME NAVBAR
      ===================================== */}

      {page === "home" && (
        <nav className="navbar">

          <div
            className="navbar-logo"
            onClick={() => navigate("home")}
          >
            🚗 Car Wash Portal
          </div>

          <div className="navbar-links">

            <button
              type="button"
              onClick={() => navigate("home")}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => navigate("login")}
            >
              Customer Login
            </button>

            <button
              type="button"
              onClick={() => navigate("register")}
            >
              Customer Register
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("admin-login")
              }
            >
              Admin Login
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("admin-register")
              }
            >
              Admin Register
            </button>

          </div>

        </nav>
      )}

      {/* =====================================
          CUSTOMER NAVBAR
      ===================================== */}

      {showCustomerNavbar && (
        <nav className="customer-navbar">

          <div
            className="customer-navbar-logo"
            onClick={() => navigate("services")}
          >
            🚗 Car Wash Portal
          </div>

          <div className="customer-navbar-links">

            <button
              type="button"
              onClick={() => navigate("services")}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => navigate("services")}
            >
              Services
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("my-bookings")
              }
            >
              My Bookings
            </button>

            <button
              type="button"
              onClick={() => navigate("profile")}
            >
              Profile
            </button>

            <button
              type="button"
              className="customer-logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        </nav>
      )}

      {/* =====================================
          HOME
      ===================================== */}

      {page === "home" && (
        <Home
          onCustomerLogin={() =>
            navigate("login")
          }
          onCustomerRegister={() =>
            navigate("register")
          }
          onAdminLogin={() =>
            navigate("admin-login")
          }
          onAdminRegister={() =>
            navigate("admin-register")
          }
        />
      )}

      {/* =====================================
          CUSTOMER SERVICES
      ===================================== */}

      {page === "services" && (
        <ServiceListing
          onViewDetails={openServiceDetails}
        />
      )}

      {/* =====================================
          SERVICE DETAILS
      ===================================== */}

      {page === "service-details" && (
        <ServiceDetails
          serviceId={selectedServiceId}
          onBack={() => navigate("services")}
        />
      )}

      {/* =====================================
          MY BOOKINGS
      ===================================== */}

      {page === "my-bookings" && (
        <MyBookings />
      )}

      {/* =====================================
          CUSTOMER PROFILE
      ===================================== */}

      {page === "profile" && (
        <CustomerProfile />
      )}

      {/* =====================================
          CUSTOMER LOGIN
      ===================================== */}

      {page === "login" && (
        <Login
          onLoginSuccess={handleCustomerLogin}
          onRegister={() =>
            navigate("register")
          }
        />
      )}

      {/* =====================================
          CUSTOMER REGISTER
      ===================================== */}

      {page === "register" && (
        <Register
          onRegisterSuccess={
            handleCustomerRegister
          }
          onBackToLogin={() =>
            navigate("login")
          }
        />
      )}

      {/* =====================================
          ADMIN LOGIN
      ===================================== */}

      {page === "admin-login" && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onRegister={() =>
            navigate("admin-register")
          }
        />
      )}

      {/* =====================================
          ADMIN REGISTER
      ===================================== */}

      {page === "admin-register" && (
        <AdminRegister
          onRegisterSuccess={
            handleAdminRegister
          }
          onBackToLogin={() =>
            navigate("admin-login")
          }
        />
      )}

      {/* =====================================
          ADMIN DASHBOARD
      ===================================== */}

      {page === "admin-dashboard" && (
        <AdminDashboard
          onNavigate={navigate}
          onLogout={logout}
        />
      )}

      {/* =====================================
          ADMIN SERVICES
      ===================================== */}

      {page === "admin-services" && (
        <div className="admin-page-wrapper">

          <button
            type="button"
            className="admin-back-btn"
            onClick={() =>
              navigate("admin-dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <AdminServiceManagement />

        </div>
      )}

      {/* =====================================
          ADMIN STAFF
      ===================================== */}

      {page === "admin-staff" && (
        <div className="admin-page-wrapper">

          <button
            type="button"
            className="admin-back-btn"
            onClick={() =>
              navigate("admin-dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <AdminStaffManagement />

        </div>
      )}

      {/* =====================================
          ADMIN BOOKINGS
      ===================================== */}

      {page === "admin-bookings" && (
        <div className="admin-page-wrapper">

          <button
            type="button"
            className="admin-back-btn"
            onClick={() =>
              navigate("admin-dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <AdminBookingManagement />

        </div>
      )}

      {/* =====================================
          ADMIN REVIEWS
      ===================================== */}

      {page === "admin-reviews" && (
        <div className="admin-page-wrapper">

          <button
            type="button"
            className="admin-back-btn"
            onClick={() =>
              navigate("admin-dashboard")
            }
          >
            ← Back to Dashboard
          </button>

          <Reviews />

        </div>
      )}

      {/* =====================================
          STAFF LOGIN
      ===================================== */}

      {page === "admin-staff-login" && (
        <StaffLogin
          onLogin={handleStaffLogin}
        />
      )}

      {/* =====================================
          STAFF DASHBOARD
      ===================================== */}

      {page === "staff-dashboard" && (
        <StaffDashboard
          staffId={staffId}
          onBackToDashboard={() =>
            navigate("admin-dashboard")
          }
          onLogout={staffLogout}
        />
      )}

    </div>
  );
}

export default App;