import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!appointmentDate || !timeSlot) {
      alert("Please select a date and time slot.");
      return;
    }

    if (onSubmit) {
      onSubmit({
        name,
        phoneNumber,
        appointmentDate,
        timeSlot,
      });
    }

    setName("");
    setPhoneNumber("");
    setAppointmentDate("");
    setTimeSlot("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      {doctorName && (
        <h3 className="appointment-form-title">
          Book appointment with {doctorName}
        </h3>
      )}
      {doctorSpeciality && (
        <p className="appointment-form-subtitle">{doctorSpeciality}</p>
      )}

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>


      <div className="form-group">
        <label htmlFor="timeSlot">Time Slot:</label>
        <select
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          <option value="09:00-10:00">09:00 - 10:00</option>
          <option value="10:00-11:00">10:00 - 11:00</option>
          <option value="11:00-12:00">11:00 - 12:00</option>
          <option value="14:00-15:00">14:00 - 15:00</option>
          <option value="15:00-16:00">15:00 - 16:00</option>
        </select>
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
