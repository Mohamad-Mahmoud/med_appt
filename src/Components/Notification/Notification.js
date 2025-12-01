import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const loadAppointmentFromStorage = () => {
    const storedUsername = sessionStorage.getItem("email");
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
    const storedAppointmentData =
      storedDoctorData &&
      JSON.parse(localStorage.getItem(storedDoctorData.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    setDoctorData(storedDoctorData || null);
    setAppointmentData(storedAppointmentData || null);
    setShowNotification(!!storedAppointmentData);
  };

  useEffect(() => {
    loadAppointmentFromStorage();
  }, []);

  useEffect(() => {
    const handleAppointmentChange = () => {
      loadAppointmentFromStorage();
    };

    window.addEventListener("appointmentUpdated", handleAppointmentChange);
    window.addEventListener("appointmentCancelled", handleAppointmentChange);

    return () => {
      window.removeEventListener("appointmentUpdated", handleAppointmentChange);
      window.removeEventListener(
        "appointmentCancelled",
        handleAppointmentChange
      );
    };
  }, []);

  return (
    <div>
      <Navbar />
      {children}
        {isLoggedIn && showNotification && doctorData && appointmentData && (
        <div className="appointment-card">
            <h3 className="appointment-card__title">Appointment Details</h3>

            <p className="appointment-card__line">
            <span className="appointment-card__label">Doctor:</span>
            <span className="appointment-card__value">
                {doctorData.name}
            </span>
            </p>

            <p className="appointment-card__line">
            <span className="appointment-card__label">Speciality:</span>
            <span className="appointment-card__value">
                {doctorData.speciality}
            </span>
            </p>

            <p className="appointment-card__line">
            <span className="appointment-card__label">Name:</span>
            <span className="appointment-card__value">
                {appointmentData.name}
            </span>
            </p>

            <p className="appointment-card__line">
            <span className="appointment-card__label">Phone Number:</span>
            <span className="appointment-card__value">
                {appointmentData.phoneNumber}
            </span>
            </p>

            <p className="appointment-card__line">
            <span className="appointment-card__label">Date of Appointment:</span>
            <span className="appointment-card__value">
                {appointmentData.appointmentDate}
            </span>
            </p>

            <p className="appointment-card__line">
            <span className="appointment-card__label">Time Slot:</span>
            <span className="appointment-card__value">
                {appointmentData.timeSlot}
            </span>
            </p>
        </div>
        )}
    </div>
  );
};

export default Notification;
