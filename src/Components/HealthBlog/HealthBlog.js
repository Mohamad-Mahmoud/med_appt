import React from "react";
import { useNavigate } from "react-router-dom";
import "./HealthBlog.css";

const HealthBlog = () => {
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const handleOpen = (path) => {
    navigate(path);
  };

  return (
    <section className="health-blog">
      <div className="health-blog-header">
        <h2>Best Services</h2>
        <p>Love yourself enough to live a healthy lifestyle.</p>
      </div>

      <div className="health-blog-cards">
        <div
          className="health-blog-card"
          onClick={() => handleProtectedClick("/instant-consultation")}
        >
          <div className="health-blog-card-image">
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/instant_consultation.png"
              }
              alt="Instant Consultation"
            />
          </div>
          <h3>Instant Consultation</h3>
        </div>

        <div
          className="health-blog-card"
          onClick={() => handleProtectedClick("/booking-consultation")}
        >
          <div className="health-blog-card-image">
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/book_appointment.png"
              }
              alt="Book an Appointment"
            />
          </div>
          <h3>Book an Appointment</h3>
        </div>

        <div
          className="health-blog-card"
          onClick={() => handleOpen("/self-checkup")}
        >
          <div className="health-blog-card-image">
            <img
              src={process.env.PUBLIC_URL + "/images/self_checkup.png"}
              alt="Self Checkup"
            />
          </div>
          <h3>Self Checkup</h3>
        </div>

        <div
          className="health-blog-card"
          onClick={() => handleOpen("/health-tips")}
        >
          <div className="health-blog-card-image">
            <img
              src={process.env.PUBLIC_URL + "/images/health_tips.png"}
              alt="Health Tips and Guidance"
            />
          </div>
          <h3>Health Tips and Guidance</h3>
        </div>
      </div>
    </section>
  );
};

export default HealthBlog;
