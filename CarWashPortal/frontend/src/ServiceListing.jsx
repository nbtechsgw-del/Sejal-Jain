import { useEffect, useState } from "react";
import "./ServiceListing.css";

function ServiceListing({ onViewDetails }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        return response.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const filteredServices = services.filter((service) => {
    const serviceName = service.name?.toLowerCase() || "";
    const serviceDescription = service.description?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    return (
      serviceName.includes(searchText) ||
      serviceDescription.includes(searchText)
    );
  });

  if (loading) {
    return (
      <div className="services-page">
        <div className="services-loading">
          <div className="loading-spinner"></div>
          <h2>Loading Services...</h2>
          <p>Please wait while we load our services.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page">

      {/* HERO SECTION */}

      <section className="services-hero">

        <div className="services-hero-content">

          <span className="services-small-title">
            PROFESSIONAL CAR CARE
          </span>

          <h1>
            Choose the Perfect
            <span> Car Wash Service</span>
          </h1>

          <p>
            Give your car the care it deserves with our professional
            cleaning and detailing services.
          </p>

        </div>

      </section>


      {/* SERVICES SECTION */}

      <section className="services-section">

        <div className="services-heading">

          <div>
            <span className="section-label">
              OUR SERVICES
            </span>

            <h2>
              Premium Car Wash Services
            </h2>

            <p>
              Select a service that perfectly fits your car's needs.
            </p>
          </div>


          {/* SEARCH */}

          <div className="service-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>


        {/* SERVICE CARDS */}

        {filteredServices.length === 0 ? (
          <div className="no-services">
            <div className="no-services-icon">
              🚗
            </div>

            <h3>No services found</h3>

            <p>
              Try searching with a different service name.
            </p>
          </div>
        ) : (
          <div className="service-grid">

            {filteredServices.map((service) => (

              <div
                className="service-card"
                key={service.id}
              >

                {/* IMAGE */}

                <div className="service-image-wrapper">

                  {service.imageUrl ? (
                    <img
                      src={`http://localhost:8080${service.imageUrl}`}
                      alt={service.name}
                      className="service-image"
                    />
                  ) : (
                    <div className="service-no-image">
                      🚗
                    </div>
                  )}

                </div>


                {/* CARD CONTENT */}

                <div className="service-card-content">

                  <div className="service-card-top">

                    <h3>
                      {service.name}
                    </h3>

                    {service.category && (
                      <span className="service-category">
                        {service.category}
                      </span>
                    )}

                  </div>


                  <p className="service-description">
                    {service.description}
                  </p>


                  {/* SERVICE INFO */}

                  <div className="service-info">

                    <div className="service-info-item">

                      <span className="info-icon">
                        ₹
                      </span>

                      <div>
                        <small>Starting from</small>

                        <strong>
                          ₹{service.price}
                        </strong>
                      </div>

                    </div>


                    <div className="service-info-item">

                      <span className="info-icon">
                        ⏱
                      </span>

                      <div>
                        <small>Duration</small>

                        <strong>
                          {service.duration}
                        </strong>
                      </div>

                    </div>

                  </div>


                  {/* BUTTON */}

                  <button
                    className="view-service-btn"
                    onClick={() =>
                      onViewDetails(service.id)
                    }
                  >
                    View Service
                    <span>→</span>
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default ServiceListing;