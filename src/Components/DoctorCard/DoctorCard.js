import React, { useState, useEffect } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(name);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAppointment(parsed);
      }
    } catch (err) {
      console.error("Failed to load appointment for doctor:", name, err);
    }
  }, [name]);


  const handleBookingClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setAppointment(null);

    localStorage.removeItem("doctorData");
    localStorage.removeItem(name);

    window.dispatchEvent(new Event("appointmentCancelled"));
  };

  const handleAppointmentSubmit = (data) => {
    setAppointment(data);

    const doctorInfo = { name, speciality, experience, ratings };
    localStorage.setItem("doctorData", JSON.stringify(doctorInfo));
    localStorage.setItem(name, JSON.stringify(data));

    window.dispatchEvent(new Event("appointmentUpdated"));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img
              src={profilePic}
              alt={name}
              className="doctor-card-profile-image"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <button
          className={`book-appointment-btn ${
            appointment ? "cancel-appointment" : ""
          }`}
          type="button"
          onClick={handleBookingClick}
        >
          <div>{appointment ? "Cancel Appointment" : "Book Appointment"}</div>
          <div>No Booking Fee</div>
        </button>
      </div>

      <Popup
        open={showModal}
        modal
        closeOnDocumentClick
        onClose={() => setShowModal(false)}
      >
        {(close) => (
          <div
            className="doctorbg"
            style={{
              maxWidth: "480px",
              margin: "0 auto",
              height: "100vh",
              overflow: "auto",
              padding: "20px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <div className="doctor-card-profile-image-container">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt={name}
                    className="doctor-card-profile-image"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                )}
              </div>
              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">
                  {speciality}
                </div>
                <div className="doctor-card-detail-experience">
                  {experience} years experience
                </div>
                <div className="doctor-card-detail-consultationfees">
                  Ratings: {ratings}
                </div>
              </div>
            </div>


            {appointment ? (
              <>
                <h3 style={{ textAlign: "center", marginBottom: "12px" }}>
                  Appointment Details
                </h3>

                <div className="appointment-summary">
                  <p>
                    <strong>Name:</strong> {appointment.name}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {appointment.phoneNumber}
                  </p>
                  <p>
                    <strong>Date:</strong> {appointment.appointmentDate}
                  </p>
                  <p>
                    <strong>Time Slot:</strong> {appointment.timeSlot}
                  </p>
                </div>

                <button
                  className="cancel-appointment-btn"
                  style={{ marginTop: "16px" }}
                  onClick={() => {
                    handleCancel();
                    close();
                  }}
                >
                  Cancel Appointment
                </button>
              </>
            ) : (
              <AppointmentForm
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={(data) => {
                  handleAppointmentSubmit(data);
                  close();
                }}
              />
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DoctorCard;
