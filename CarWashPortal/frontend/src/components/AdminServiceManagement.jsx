import { useEffect, useState } from "react";
import "./AdminServiceManagement.css";
function AdminServiceManagement() {
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    active: true,
  });

  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      active: true,
    });

    setImage(null);
    setEditingId(null);
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:8080/api/services/${editingId}`
        : "http://localhost:8080/api/services";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          duration: Number(formData.duration),
          popularity: editingId ? undefined : 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save service");
      }

      const savedService = await response.json();

      // Upload image
      if (image) {
        const imageData = new FormData();
        imageData.append("image", image);

        await fetch(
          `http://localhost:8080/api/services/${savedService.id}/image`,
          {
            method: "POST",
            body: imageData,
          }
        );
      }

      alert(
        editingId
          ? "Service updated successfully!"
          : "Service added successfully!"
      );

      resetForm();
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // EDIT
  const handleEdit = (service) => {
    setEditingId(service.id);

    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category || "",
      active: service.active,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/services/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      alert("Service deleted successfully!");

      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Error deleting service");
    }
  };

  // ACTIVE / INACTIVE
  const toggleStatus = async (service) => {
    try {
      const newStatus = !service.active;

      const response = await fetch(
        `http://localhost:8080/api/services/${service.id}/status?active=${newStatus}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Status update failed");
      }

      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Error changing service status");
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Service Management</h1>

      {/* FORM */}

      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>
          {editingId ? "Update Service" : "Add New Service"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Service Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (Minutes)"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Exterior Wash">Exterior Wash</option>
          <option value="Interior Wash">Interior Wash</option>
          <option value="Full Service">Full Service</option>
          <option value="Detailing">Detailing</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <select
          name="active"
          value={formData.active}
          onChange={(e) =>
            setFormData({
              ...formData,
              active: e.target.value === "true",
            })
          }
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="save-button">
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="cancel-button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* SERVICE LIST */}

      <h2 className="existing-title">Existing Services</h2>

      <div className="admin-service-list">
        {services.map((service) => (
          <div className="admin-service-card" key={service.id}>
            {service.imageUrl && (
              <img
                src={`http://localhost:8080${service.imageUrl}`}
                alt={service.name}
              />
            )}

            <div className="admin-service-content">
              <h3>{service.name}</h3>

              <p>{service.description}</p>

              <p>
                <strong>Price:</strong> ₹{service.price}
              </p>

              <p>
                <strong>Duration:</strong> {service.duration} Minutes
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {service.category || "Not Set"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    service.active
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {service.active ? "Active" : "Inactive"}
                </span>
              </p>

              <div className="admin-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </button>

                <button
                  className="active-btn"
                  onClick={() => toggleStatus(service)}
                >
                  {service.active
                    ? "Make Inactive"
                    : "Make Active"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminServiceManagement;