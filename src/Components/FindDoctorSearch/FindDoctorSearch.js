import React, { useState } from "react";
import "./FindDoctorSearch.css";

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = ({ onSearch }) => {
  const [searchDoctor, setSearchDoctor] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = initSpeciality.filter((spec) =>
    spec.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const handleSelect = (spec) => {
    setSearchDoctor(spec);
    setIsOpen(false);
    if (onSearch) {
      onSearch(spec);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchDoctor(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="home-search-container">
      <div className="doctor-search-box">

        <input
          type="text"
          className="search-doctor-input-box"
          placeholder="Search for doctor by speciality"
          value={searchDoctor}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}                         
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}  
        />

        {isOpen && (
          <div className="search-doctor-input-results">
            {filtered.length === 0 ? (
              <div className="search-doctor-result-item">
                <span></span>
                <span>No specialties found</span>
                <span></span>
              </div>
            ) : (
              filtered.map((spec) => (
                <div
                  key={spec}
                  className="search-doctor-result-item"
                  onMouseDown={() => handleSelect(spec)}
                >
                  <span>Dr</span>
                  <span>{spec}</span>
                  <span>Speciality</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;
