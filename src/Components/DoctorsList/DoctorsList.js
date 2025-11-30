import React from "react";
import DoctorCard from "../DoctorCard/DoctorCard";

const DoctorsList = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      speciality: "Dentist",
      experience: 9,
      ratings: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Dr. Mark D. Okusa",
      speciality: "General Physician",
      experience: 3,
      ratings: "⭐⭐⭐",
    },
        {
      name: "Dr. Jeff D. Bozos",
      speciality: "General Physician",
      experience: 3,
      ratings: "⭐⭐",
    },
        {
      name: "Dr. Emily Clark",
      speciality: "Gynecologist/Obstetrician",
      experience: 12,
      ratings: "⭐⭐⭐⭐",
    },
  ];

  return (
    <div>
      {doctors.map((doc) => (
        <DoctorCard key={doc.name} {...doc} />
      ))}
    </div>
  );
};

export default DoctorsList;
