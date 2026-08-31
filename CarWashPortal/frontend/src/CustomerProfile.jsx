import { useEffect, useState } from "react";
import "./CustomerProfile.css";
function CustomerProfile() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updating, setUpdating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("customer");

    if (!savedCustomer) {
      setError("Customer information not found.");
      setLoading(false);
      return;
    }

    try {
      const customerData = JSON.parse(savedCustomer);

      if (!customerData.id) {
        setError("Customer ID not found.");
        setLoading(false);
        return;
      }

      fetch(
        `http://localhost:8080/api/customers/${customerData.id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load profile.");
          }

          return response.json();
        })
        .then((data) => {
          console.log("CUSTOMER PROFILE:", data);

          setCustomer(data);
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
        })
        .catch((error) => {
          console.error("PROFILE LOAD ERROR:", error);
          setError("Unable to load profile.");
        })
        .finally(() => {
          setLoading(false);
        });

    } catch (error) {
      console.error("LOCAL STORAGE ERROR:", error);
      setError("Invalid customer information.");
      setLoading(false);
    }
  }, []);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!customer || !customer.id) {
      setError("Customer ID not found.");
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill all fields.");
      return;
    }

    setUpdating(true);

    try {
      console.log(
        "Updating customer:",
        customer.id
      );

      const response = await fetch(
        `http://localhost:8080/api/customers/${customer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
          }),
        }
      );

      console.log(
        "UPDATE PROFILE STATUS:",
        response.status
      );

      const responseText = await response.text();

      console.log(
        "UPDATE PROFILE RESPONSE:",
        responseText
      );

      if (!response.ok) {
        throw new Error(
          responseText || "Failed to update profile."
        );
      }

      let updatedCustomer;

      try {
        updatedCustomer = JSON.parse(responseText);
      } catch {
        updatedCustomer = {
          ...customer,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        };
      }

      setCustomer(updatedCustomer);

      localStorage.setItem(
        "customer",
        JSON.stringify(updatedCustomer)
      );

      setName(updatedCustomer.name || "");
      setEmail(updatedCustomer.email || "");
      setPhone(updatedCustomer.phone || "");

      setMessage(
        "Profile updated successfully!"
      );

    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to update profile."
      );

    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!oldPassword || !newPassword) {
      setError(
        "Please enter both passwords."
      );
      return;
    }

    if (!customer || !customer.id) {
      setError("Customer ID not found.");
      return;
    }

    setChangingPassword(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${customer.id}/change-password?oldPassword=${encodeURIComponent(
          oldPassword
        )}&newPassword=${encodeURIComponent(
          newPassword
        )}`,
        {
          method: "PUT",
        }
      );

      const data = await response.text();

      console.log(
        "CHANGE PASSWORD STATUS:",
        response.status
      );

      console.log(
        "CHANGE PASSWORD RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data || "Password change failed."
        );
      }

      setMessage(
        "Password changed successfully!"
      );

      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      console.error(
        "CHANGE PASSWORD ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to change password."
      );

    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">

        <div className="profile-loading">

          <h2>
            Loading Profile...
          </h2>

          <p>
            Please wait.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div>

          <span className="profile-label">
            CUSTOMER PORTAL
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            View and manage your personal information.
          </p>

        </div>

        <div className="profile-avatar">

          {name
            ? name.charAt(0).toUpperCase()
            : "C"}

        </div>

      </div>

      {message && (
        <div className="profile-success">
          {message}
        </div>
      )}

      {error && (
        <div className="profile-error">
          {error}
        </div>
      )}

      <div className="profile-container">

        <div className="profile-card">

          <div className="card-heading">

            <h2>
              Personal Information
            </h2>

            <p>
              Update your account details.
            </p>

          </div>

          <form onSubmit={handleUpdateProfile}>

            <div className="profile-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
              />

            </div>

            <div className="profile-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
              />

            </div>

            <div className="profile-form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter your phone number"
              />

            </div>

            <button
              type="submit"
              className="profile-update-btn"
              disabled={updating}
            >

              {updating
                ? "Updating..."
                : "Update Profile"}

            </button>

          </form>

        </div>

        <div className="profile-card">

          <div className="card-heading">

            <h2>
              Change Password
            </h2>

            <p>
              Keep your account secure.
            </p>

          </div>

          <form onSubmit={handleChangePassword}>

            <div className="profile-form-group">

              <label>
                Current Password
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(event) =>
                  setOldPassword(event.target.value)
                }
                placeholder="Enter current password"
              />

            </div>

            <div className="profile-form-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                placeholder="Enter new password"
              />

            </div>

            <button
              type="submit"
              className="password-btn"
              disabled={changingPassword}
            >

              {changingPassword
                ? "Changing..."
                : "Change Password"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CustomerProfile;