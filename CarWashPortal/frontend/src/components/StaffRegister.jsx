import { useState } from "react";

function StaffRegister({ onRegisterSuccess, onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/staff/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password: password
          })
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch (error) {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          "Staff registration failed."
        );
      }

      alert("Staff registered successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      if (onRegisterSuccess) {
        onRegisterSuccess(data);
      }
    } catch (error) {
      console.error("Staff registration error:", error);

      alert(
        error.message ||
        "Unable to register staff."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">

      <div className="login-container">

        <h1>Staff Registration</h1>

        <p>
          Create a new staff account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Staff Name</label>

            <input
              type="text"
              placeholder="Enter staff name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter staff email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="form-group">

            <label>Phone</label>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register Staff"}
          </button>

        </form>

        <button
          type="button"
          className="admin-back-btn"
          onClick={onBackToLogin}
        >
          Back to Staff Login
        </button>

      </div>

    </div>
  );
}

export default StaffRegister;