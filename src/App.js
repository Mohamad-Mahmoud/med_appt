import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Components/Landing_Page/LandingPage";
import Sign_Up from "./Components/Sign_Up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation";
import DoctorsList from "./Components/DoctorsList/DoctorsList";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />  
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/reports" element={<ReportsLayout />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
