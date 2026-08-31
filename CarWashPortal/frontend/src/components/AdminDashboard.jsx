import { useEffect, useState } from "react";
import "./AdminDashboard.css";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function AdminDashboard({ onNavigate, onLogout }) {

  const [dashboard, setDashboard] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [customerGrowth, setCustomerGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const dashboardResponse = await fetch(
        "http://localhost:8080/api/admin/dashboard"
      );

      if (!dashboardResponse.ok) {
        throw new Error("Dashboard API failed");
      }

      const dashboardData = await dashboardResponse.json();
      setDashboard(dashboardData);

      const revenueResponse = await fetch(
        "http://localhost:8080/api/admin/dashboard/monthly-revenue"
      );

      if (revenueResponse.ok) {
        const data = await revenueResponse.json();
        setMonthlyRevenue(Array.isArray(data) ? data : []);
      }

      const bookingResponse = await fetch(
        "http://localhost:8080/api/admin/dashboard/booking-trends"
      );

      if (bookingResponse.ok) {
        const data = await bookingResponse.json();
        setBookingTrends(Array.isArray(data) ? data : []);
      }

      const popularResponse = await fetch(
        "http://localhost:8080/api/admin/dashboard/popular-services"
      );

      if (popularResponse.ok) {
        const data = await popularResponse.json();
        setPopularServices(Array.isArray(data) ? data : []);
      }

      const growthResponse = await fetch(
        "http://localhost:8080/api/admin/dashboard/customer-growth"
      );

      if (growthResponse.ok) {
        const data = await growthResponse.json();
        setCustomerGrowth(Array.isArray(data) ? data : []);
      }

    } catch (err) {
      console.error("Dashboard Error:", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const goTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");

    if (onLogout) {
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Dashboard...</h2>
        <p>Please wait while dashboard data is loading.</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="admin-error">
        <div className="error-icon">!</div>
        <h2>Dashboard Error</h2>
        <p>{error || "No dashboard data available."}</p>

        <button type="button" onClick={loadDashboard}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`admin-layout ${collapsed ? "collapsed-layout" : ""}`}>

      <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

        <div className="sidebar-logo">

          <div className="logo-icon">
            CW
          </div>

          {!collapsed && (
            <div className="logo-text">
              <strong>Car Wash</strong>
              <span>Admin Panel</span>
            </div>
          )}

        </div>

        <div className="sidebar-menu">

          {!collapsed && (
            <p className="menu-title">MAIN MENU</p>
          )}

          <button
            type="button"
            className="sidebar-item active"
            onClick={() => goTo("admin-dashboard")}
          >
            <span className="sidebar-icon">D</span>

            {!collapsed && (
              <span>Dashboard</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => goTo("admin-services")}
          >
            <span className="sidebar-icon">S</span>

            {!collapsed && (
              <span>Services</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => goTo("admin-staff")}
          >
            <span className="sidebar-icon">ST</span>

            {!collapsed && (
              <span>Staff Management</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => goTo("admin-bookings")}
          >
            <span className="sidebar-icon">B</span>

            {!collapsed && (
              <span>Bookings</span>
            )}
          </button>

          {!collapsed && (
            <p className="menu-title second">MANAGEMENT</p>
          )}

          <button
            type="button"
            className="sidebar-item"
            onClick={() => goTo("admin-reviews")}
          >
            <span className="sidebar-icon">R</span>

            {!collapsed && (
              <span>Reviews & Ratings</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => goTo("admin-staff-login")}
          >
            <span className="sidebar-icon">L</span>

            {!collapsed && (
              <span>Staff Login</span>
            )}
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => goTo("staff-register")}
          >
            <span className="sidebar-icon">+</span>

            {!collapsed && (
              <span>Staff Register</span>
            )}
          </button>

        </div>

        <div className="sidebar-bottom">

          <button
            type="button"
            className="sidebar-item logout-sidebar"
            onClick={logout}
          >
            <span className="sidebar-icon">X</span>

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>

        </div>

      </aside>

      <main className="admin-main">

        <header className="admin-topbar">

          <div className="topbar-left">

            <button
              type="button"
              className="sidebar-toggle"
              onClick={() => setCollapsed(!collapsed)}
            >
              ☰
            </button>

            <div>
              <h3>Admin Dashboard</h3>
              <span>Car Wash Management System</span>
            </div>

          </div>

          <div className="topbar-right">

            <button
              type="button"
              className="notification-btn"
            >
              !
              <span className="notification-dot"></span>
            </button>

            <div className="admin-user">

              <div className="admin-avatar">
                A
              </div>

              <div className="admin-user-info">
                <strong>Administrator</strong>
                <span>Admin</span>
              </div>

            </div>

          </div>

        </header>

        <div className="admin-content">

          <div className="dashboard-page-title">

            <div>
              <h1>Admin Dashboard</h1>

              <p>
                Welcome back! Here's what's happening with your car wash business today.
              </p>
            </div>

            <div className="dashboard-date">
              Today
            </div>

          </div>

          <div className="dashboard-cards">

            <div className="dashboard-card customers-card">
              <div className="card-top">
                <div className="card-icon">C</div>
                <span className="card-trend">Customers</span>
              </div>

              <p>Total Customers</p>

              <h2>
                {dashboard.totalCustomers ?? 0}
              </h2>
            </div>

            <div className="dashboard-card services-card">
              <div className="card-top">
                <div className="card-icon">S</div>
                <span className="card-trend">Services</span>
              </div>

              <p>Total Services</p>

              <h2>
                {dashboard.totalServices ?? 0}
              </h2>
            </div>

            <div className="dashboard-card bookings-card">
              <div className="card-top">
                <div className="card-icon">B</div>
                <span className="card-trend">Bookings</span>
              </div>

              <p>Total Bookings</p>

              <h2>
                {dashboard.totalBookings ?? 0}
              </h2>
            </div>

            <div className="dashboard-card today-card">
              <div className="card-top">
                <div className="card-icon">T</div>
                <span className="card-trend">Today</span>
              </div>

              <p>Today's Bookings</p>

              <h2>
                {dashboard.todaysBookings ?? 0}
              </h2>
            </div>

            <div className="dashboard-card pending-card">
              <div className="card-top">
                <div className="card-icon">P</div>
                <span className="card-trend">Pending</span>
              </div>

              <p>Pending Bookings</p>

              <h2>
                {dashboard.pendingBookings ?? 0}
              </h2>
            </div>

            <div className="dashboard-card completed-card">
              <div className="card-top">
                <div className="card-icon">OK</div>
                <span className="card-trend">Completed</span>
              </div>

              <p>Completed Services</p>

              <h2>
                {dashboard.completedServices ?? 0}
              </h2>
            </div>

            <div className="dashboard-card revenue-card">
              <div className="card-top">
                <div className="card-icon">R</div>
                <span className="card-trend">Revenue</span>
              </div>

              <p>Total Revenue</p>

              <h2>
                Rs. {Number(
                  dashboard.totalRevenue ?? 0
                ).toFixed(2)}
              </h2>
            </div>

          </div>

          <div className="analytics-heading">
            <h2>Analytics Overview</h2>
            <p>Monitor your business performance</p>
          </div>

          <div className="charts-grid">

            <div className="chart-card">

              <div className="chart-header">

                <div>
                  <h3>Monthly Revenue</h3>
                  <p>Revenue generated each month</p>
                </div>

                <span className="chart-badge revenue-badge">
                  Revenue
                </span>

              </div>

              <div className="chart-container">

                {monthlyRevenue.length === 0 ? (

                  <div className="empty-chart">
                    No revenue data available.
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart data={monthlyRevenue}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="revenue"
                        name="Revenue"
                        radius={[6, 6, 0, 0]}
                        barSize={35}
                      />

                    </BarChart>
                  </ResponsiveContainer>

                )}

              </div>

            </div>

            <div className="chart-card">

              <div className="chart-header">

                <div>
                  <h3>Booking Trends</h3>
                  <p>Recent booking activity</p>
                </div>

                <span className="chart-badge booking-badge">
                  Bookings
                </span>

              </div>

              <div className="chart-container">

                {bookingTrends.length === 0 ? (

                  <div className="empty-chart">
                    No booking data available.
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart data={bookingTrends}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="date" />

                      <YAxis />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="bookings"
                        name="Bookings"
                        strokeWidth={3}
                      />

                    </LineChart>
                  </ResponsiveContainer>

                )}

              </div>

            </div>

          </div>

          <div className="charts-grid">

            <div className="chart-card">

              <div className="chart-header">

                <div>
                  <h3>Popular Services</h3>
                  <p>Most booked services</p>
                </div>

              </div>

              <div className="chart-container pie-container">

                {popularServices.length === 0 ? (

                  <div className="empty-chart">
                    No popular service data available.
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={popularServices}
                        dataKey="bookings"
                        nameKey="serviceName"
                        cx="50%"
                        cy="45%"
                        outerRadius={100}
                        innerRadius={55}
                        paddingAngle={3}
                      >

                        {popularServices.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                            />
                          )
                        )}

                      </Pie>

                      <Tooltip />

                      <Legend />

                    </PieChart>

                  </ResponsiveContainer>

                )}

              </div>

            </div>

            <div className="chart-card">

              <div className="chart-header">

                <div>
                  <h3>Customer Growth</h3>
                  <p>New customers by month</p>
                </div>

                <span className="chart-badge customer-badge">
                  Customers
                </span>

              </div>

              <div className="chart-container">

                {customerGrowth.length === 0 ? (

                  <div className="empty-chart">
                    No customer growth data available.
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart data={customerGrowth}>

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="customers"
                        name="Customers"
                        radius={[6, 6, 0, 0]}
                        barSize={35}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                )}

              </div>

            </div>

          </div>

          <div className="quick-actions-section">

            <div className="analytics-heading">

              <h2>Quick Actions</h2>

              <p>
                Quickly manage your car wash portal
              </p>

            </div>

            <div className="quick-actions">

              <button
                type="button"
                onClick={() => goTo("admin-services")}
              >
                <span>S</span>

                <div>
                  <strong>Manage Services</strong>
                  <small>Add or edit services</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => goTo("admin-staff")}
              >
                <span>ST</span>

                <div>
                  <strong>Manage Staff</strong>
                  <small>Add and manage staff</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => goTo("admin-bookings")}
              >
                <span>B</span>

                <div>
                  <strong>Manage Bookings</strong>
                  <small>View all bookings</small>
                </div>
              </button>

              <button
                type="button"
                onClick={() => goTo("admin-reviews")}
              >
                <span>R</span>

                <div>
                  <strong>Reviews</strong>
                  <small>View customer reviews</small>
                </div>
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;