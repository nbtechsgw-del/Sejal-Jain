import { useEffect, useState } from "react";
import "./AdminStaffManagement.css";

function AdminStaffManagement() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    availabilityStatus: "AVAILABLE",
  });

  const fetchStaff = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/staff"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }

      const data = await response.json();

      setStaff(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      mobileNumber: "",
      email: "",
      password: "",
      availabilityStatus: "AVAILABLE",
    });

    setEditingStaff(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingStaff && !formData.password) {
      alert("Please enter a password.");
      return;
    }

    try {
      const url = editingStaff
        ? `http://localhost:8080/api/staff/${editingStaff.staffId}`
        : "http://localhost:8080/api/staff";

      const method = editingStaff ? "PUT" : "POST";

      const requestData = {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        availabilityStatus: formData.availabilityStatus,
      };

      if (formData.password) {
        requestData.password = formData.password;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save staff"
        );
      }

      alert(
        editingStaff
          ? "Staff updated successfully!"
          : "Staff added successfully!"
      );

      resetForm();
      fetchStaff();
    } catch (error) {
      console.error("Save staff error:", error);
      alert(error.message || "Unable to save staff.");
    }
  };

  const handleEdit = (member) => {
    setEditingStaff(member);

    setFormData({
      fullName: member.fullName || "",
      mobileNumber: member.mobileNumber || "",
      email: member.email || "",
      password: "",
      availabilityStatus:
        member.availabilityStatus || "AVAILABLE",
    });

    setShowForm(true);
  };

  const toggleAvailability = async (member) => {
    const newStatus =
      member.availabilityStatus === "AVAILABLE"
        ? "UNAVAILABLE"
        : "AVAILABLE";

    try {
      const response = await fetch(
        `http://localhost:8080/api/staff/${member.staffId}/availability?status=${newStatus}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update availability"
        );
      }

      setStaff((previousStaff) =>
        previousStaff.map((item) =>
          item.staffId === member.staffId
            ? data
            : item
        )
      );
    } catch (error) {
      console.error("Availability error:", error);

      alert(
        error.message ||
        "Unable to update staff availability."
      );
    }
  };

  const deleteStaff = async (staffId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff member?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/staff/${staffId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete staff");
      }

      setStaff((previousStaff) =>
        previousStaff.filter(
          (member) =>
            member.staffId !== staffId
        )
      );

      alert("Staff deleted successfully!");
    } catch (error) {
      console.error("Delete staff error:", error);

      alert("Unable to delete staff.");
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <h1>Staff Management</h1>
        <p>Loading staff...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">

      <div className="staff-page-header">

        <div>
          <h1>Staff Management</h1>

          <p>
            Manage your car wash staff members
          </p>
        </div>

        <button
          type="button"
          className="add-staff-btn"
          onClick={() => {
            setEditingStaff(null);

            setFormData({
              fullName: "",
              mobileNumber: "",
              email: "",
              password: "",
              availabilityStatus: "AVAILABLE",
            });

            setShowForm(true);
          }}
        >
          + Add Staff
        </button>

      </div>

      {showForm && (
        <div className="staff-form-card">

          <div className="staff-form-header">

            <h2>
              {editingStaff
                ? "Update Staff"
                : "Add New Staff"}
            </h2>

            <button
              type="button"
              onClick={resetForm}
            >
              ✕
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="staff-form-grid">

              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder={
                    editingStaff
                      ? "Enter new password"
                      : "Create password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  required={!editingStaff}
                />
              </div>

              <div>
                <label>Availability Status</label>

                <select
                  name="availabilityStatus"
                  value={formData.availabilityStatus}
                  onChange={handleChange}
                >
                  <option value="AVAILABLE">
                    Available
                  </option>

                  <option value="UNAVAILABLE">
                    Unavailable
                  </option>
                </select>
              </div>

            </div>

            <div className="staff-form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-staff-btn"
              >
                {editingStaff
                  ? "Update Staff"
                  : "Add Staff"}
              </button>

            </div>

          </form>

        </div>
      )}

      {staff.length === 0 ? (

        <div className="no-staff">

          <h2>No Staff Members</h2>

          <p>
            Add your first staff member
            to get started.
          </p>

        </div>

      ) : (

        <div className="staff-list">

          {staff.map((member) => (

            <div
              className="staff-card"
              key={member.staffId}
            >

              <div className="staff-card-header">

                <div className="staff-avatar">
                  {member.fullName
                    ? member.fullName
                        .charAt(0)
                        .toUpperCase()
                    : "S"}
                </div>

                <div>

                  <h2>
                    {member.fullName}
                  </h2>

                  <span>
                    Staff ID: #{member.staffId}
                  </span>

                </div>

                <span
                  className={
                    member.availabilityStatus ===
                    "AVAILABLE"
                      ? "staff-status available"
                      : "staff-status unavailable"
                  }
                >
                  {member.availabilityStatus}
                </span>

              </div>

              <div className="staff-details">

                <div>
                  <span>Mobile</span>

                  <strong>
                    {member.mobileNumber}
                  </strong>
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {member.email}
                  </strong>
                </div>

                <div>
                  <span>Availability</span>

                  <strong>
                    {member.availabilityStatus}
                  </strong>
                </div>

              </div>

              <div className="staff-actions">

                <button
                  type="button"
                  className="edit-staff-btn"
                  onClick={() =>
                    handleEdit(member)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="availability-btn"
                  onClick={() =>
                    toggleAvailability(member)
                  }
                >
                  {member.availabilityStatus ===
                  "AVAILABLE"
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  className="delete-staff-btn"
                  onClick={() =>
                    deleteStaff(member.staffId)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminStaffManagement;