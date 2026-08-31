import { useState } from "react";
import "./AdminLayout.css";

function AdminLayout({ page, onNavigate, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      icon: "⌂",
      page: "adminDashboard",
    },
    {
      label: "Bookings",
      icon: "📅",
      page: "adminBookings",
    },
    {
      label: "Services",
      icon: "🚘",
      page: "adminServices",
    },
    {
      label: "Staff",
      icon: "👨‍🔧",
      page: "adminStaff",
    },
  ];

  const handleNavigation = (pageName) => {
    onNavigate(pageName);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* LOGO */}

        <div className="sidebar-logo">

          <div className="logo-icon">
            🚗
          </div>

          <div className="logo-text">
            <h2>CarWash</h2>
            <span>Portal</span>
          </div>

        </div>


        {/* MENU */}

        <div className="sidebar-menu">

          <p className="menu-title">
            MAIN MENU
          </p>

          {menuItems.map((item) => (

            <button
              key={item.page}
              className={`sidebar-item ${
                page === item.page ? "active" : ""
              }`}
              onClick={() =>
                handleNavigation(item.page)
              }
            >

              <span className="menu-icon">
                {item.icon}
              </span>

              <span className="menu-label">
                {item.label}
              </span>

            </button>

          ))}


          <p className="menu-title settings-title">
            SYSTEM
          </p>


          {/* Future options */}

          <button
            className="sidebar-item disabled-item"
            disabled
          >

            <span className="menu-icon">
              💳
            </span>

            <span className="menu-label">
              Payments
            </span>

          </button>


          <button
            className="sidebar-item disabled-item"
            disabled
          >

            <span className="menu-icon">
              ⚙
            </span>

            <span className="menu-label">
              Settings
            </span>

          </button>

        </div>


        {/* BOTTOM */}

        <div className="sidebar-bottom">

          <div className="admin-profile">

            <div className="profile-avatar">
              A
            </div>

            <div className="profile-info">

              <strong>
                Admin
              </strong>

              <span>
                Administrator
              </span>

            </div>

            <span className="profile-dots">
              ⋮
            </span>

          </div>


          <button
            className="logout-btn"
            onClick={onLogout}
          >

            <span>
              ↪
            </span>

            Logout

          </button>

        </div>

      </aside>


      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}


      {/* ================= MAIN ================= */}

      <main className="admin-main">

        {/* TOP HEADER */}

        <header className="top-header">

          <div className="header-left">

            <button
              className="mobile-menu-btn"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >
              ☰
            </button>

            <div>

              <p className="breadcrumb">
                Admin Panel /{" "}
                {page === "adminDashboard"
                  ? "Dashboard"
                  : page === "adminBookings"
                  ? "Bookings"
                  : page === "adminServices"
                  ? "Services"
                  : page === "adminStaff"
                  ? "Staff"
                  : "Overview"}
              </p>

            </div>

          </div>


          <div className="header-actions">

            <button className="notification-btn">
              🔔
            </button>

            <div className="header-profile">

              <div className="header-avatar">
                A
              </div>

              <div>

                <strong>
                  Admin
                </strong>

                <span>
                  Administrator
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <div className="admin-page-content">
          {children}
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;