import React, { useState } from "react";
import "./InstantConsultationBooking/InstantConsultation.css";
import FindDoctorSearch from "./FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./DoctorCard/DoctorCard";

const initialDoctors = [
  {
    name: "Dr. Sarah Johnson",
    speciality: "Dentist",
    experience: 9,
    ratings: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Dr. Mark Okusa",
    speciality: "General Physician",
    experience: 3,
    ratings: "⭐⭐⭐",
  },
  {
    name: "Dr. Emily Clark",
    speciality: "Gynecologist/Obstetrician",
    experience: 12,
    ratings: "⭐⭐⭐⭐",
  },
  {
    name: "Dr. David Anderson",
    speciality: "Dentist",
    experience: 15,
    ratings: "⭐⭐⭐⭐",
  },
];

const BookingConsultation = () => {
  const [doctors] = useState(initialDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (searchText) => {
    const trimmed = searchText.trim();

    if (trimmed === "") {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(trimmed.toLowerCase())
    );

    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  return (
    <center>
      <div className="searchpage-container">
    
        <FindDoctorSearch onSearch={handleSearch} />


        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>{filteredDoctors.length} doctors are available</h2>
              <h3>
                Book appointments with minimum wait-time &amp; verified doctor
                details
              </h3>

              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    className="doctorcard"
                    key={doctor.name}
                    {...doctor}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            ""
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
