import { useEffect, useState } from "react";
import "./CustomerProfile.css";

function CustomerProfile() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");

    if (!storedCustomer) {
      setError("Customer is not logged in.");
      setLoading(false);
      return;
    }

    const loggedInCustomer = JSON.parse(storedCustomer);

    const customerId = loggedInCustomer.id;

    if (!customerId) {
      setError("Customer ID not found.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/customers/${customerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch customer profile");
        }

        return response.json();
      })
      .then((data) => {
        setCustomer(data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("PROFILE ERROR:", err);
        setError("Unable to load profile.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const storedCustomer = localStorage.getItem("customer");

    if (!storedCustomer) {
      setError("Customer is not logged in.");
      return;
    }

    const loggedInCustomer = JSON.parse(storedCustomer);

    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${loggedInCustomer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedCustomer = await response.json();

      setCustomer(updatedCustomer);

      localStorage.setItem(
        "customer",
        JSON.stringify(updatedCustomer)
      );

      setFormData({
        name: updatedCustomer.name || "",
        email: updatedCustomer.email || "",
        phone: updatedCustomer.phone || "",
        address: updatedCustomer.address || "",
      });

      setIsEditing(false);

      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("UPDATE PROFILE ERROR:", err);
      setError("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-spinner"></div>

          <h2>Loading Profile...</h2>

          <p>Please wait while we fetch your information.</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <h2>Profile Unavailable</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* HEADER */}

      <section className="profile-header">

        <div>
          <span className="profile-label">
            CUSTOMER PORTAL
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and account details.
          </p>
        </div>

      </section>


      {/* PROFILE CONTENT */}

      <section className="profile-section">

        {message && (
          <div className="profile-success">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="profile-error-message">
            {error}
          </div>
        )}


        <div className="profile-card">

          {/* PROFILE TOP */}

          <div className="profile-card-top">

            <div className="profile-avatar">
              {customer.name
                ? customer.name.charAt(0).toUpperCase()
                : "C"}
            </div>

            <div>
              <h2>{customer.name}</h2>
              <p>{customer.email}</p>
            </div>

          </div>


          {/* PROFILE DETAILS */}

          {!isEditing ? (

            <div className="profile-details">

              <div className="profile-detail-item">
                <span>Full Name</span>
                <strong>
                  {customer.name || "Not provided"}
                </strong>
              </div>

              <div className="profile-detail-item">
                <span>Email Address</span>
                <strong>
                  {customer.email || "Not provided"}
                </strong>
              </div>

              <div className="profile-detail-item">
                <span>Phone Number</span>
                <strong>
                  {customer.phone || "Not provided"}
                </strong>
              </div>

              <div className="profile-detail-item">
                <span>Address</span>
                <strong>
                  {customer.address || "Not provided"}
                </strong>
              </div>

            </div>

          ) : (

            <form
              className="profile-form"
              onSubmit={handleUpdate}
            >

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>Address</label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>


              <div className="profile-form-buttons">

                <button
                  type="submit"
                  className="save-profile-btn"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="cancel-profile-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>

              </div>

            </form>

          )}


          {/* EDIT BUTTON */}

          {!isEditing && (
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}

        </div>

      </section>

    </div>
  );
}

export default CustomerProfile;