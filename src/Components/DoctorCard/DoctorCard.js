import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState(null); 

  const handleBookingClick = () => {
    if (appointment) {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this appointment?"
      );
      if (confirmCancel) {
        setAppointment(null);
        setShowForm(false);
        localStorage.removeItem("doctorData");
        localStorage.removeItem(name);
        
        window.dispatchEvent(new Event("appointmentCancelled"));
      }
    } else {
      setShowForm(true);
    }
  };


  const handleAppointmentSubmit = (data) => {
    setAppointment(data);
    setShowForm(false);

    const doctorInfo = { name, speciality, experience, ratings };
    localStorage.setItem("doctorData", JSON.stringify(doctorInfo));
    localStorage.setItem(name, JSON.stringify(data));

    window.dispatchEvent(new Event("appointmentUpdated"));

    alert(
      `Appointment booked with ${name} on ${data.appointmentDate} at ${data.timeSlot}`
    );
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
          onClick={handleBookingClick}
        >
          <div>{appointment ? "Cancel Appointment" : "Book Appointment"}</div>
          <div>No Booking Fee</div>
        </button>
      </div>

      {showForm && !appointment && (
        <AppointmentForm
          doctorName={name}
          doctorSpeciality={speciality}
          onSubmit={handleAppointmentSubmit}
        />
      )}

      {appointment && (
        <div className="bookedInfo">
          <h4>Appointment Booked!</h4>
          <p>Name: {appointment.name}</p>
          <p>Phone: {appointment.phoneNumber}</p>
          <p>Date: {appointment.appointmentDate}</p>
          <p>Time: {appointment.timeSlot}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
