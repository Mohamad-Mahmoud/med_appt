import React, { useState } from "react";
import "./FindDoctorSearch.css";

const initSpeciality = [
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearch = ({ onSearch }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [specialities] = useState(initSpeciality);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    // 🔹 instead of navigate + reload, tell parent what was selected
    if (onSearch) {
      onSearch(speciality);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchDoctor(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const filteredSpecialities = specialities.filter((spec) =>
    spec.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Book appointments</h1>

        <div>
          <i
            style={{ color: "#000000", fontSize: "20rem" }}
            className="fa fa-user-md"
          ></i>
        </div>

        <div
          className="home-search-container"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setDoctorResultHidden(true)}
              value={searchDoctor}
              onChange={handleChange}
            />

            <div className="findiconimg">
              <img
                className="findIcon"
                src={process.env.PUBLIC_URL + "/images/search.svg"}
                alt=""
              />
            </div>

            <div
              className="search-doctor-input-results"
              hidden={doctorResultHidden}
            >
              {filteredSpecialities.length === 0 ? (
                <div className="search-doctor-result-item">
                  <span></span>
                  <span>No specialties found</span>
                  <span></span>
                </div>
              ) : (
                filteredSpecialities.map((speciality) => (
                  <div
                    className="search-doctor-result-item"
                    key={speciality}
                    onMouseDown={() => handleDoctorSelect(speciality)}
                  >
                    <span>
                      <img
                        src={process.env.PUBLIC_URL + "/images/search.svg"}
                        alt=""
                        style={{ height: "10px", width: "10px" }}
                        width="12"
                      />
                    </span>
                    <span>{speciality}</span>
                    <span>SPECIALITY</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
