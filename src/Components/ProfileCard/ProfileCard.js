import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };


  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); 
      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = {
        name: updatedDetails.name,
        phone: updatedDetails.phone,
        email: updatedDetails.email || email,
      };

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        sessionStorage.setItem("name", payload.name);
        sessionStorage.setItem("phone", payload.phone);

        setUserDetails(payload);
        setEditMode(false);
        alert("Profile Updated Successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Could not update profile. Please try again.");
    }
  };
  return (
    <div className="profile-container">
      <div className="profile-card">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={updatedDetails.name || ""}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Phone
              <input
                type="text"
                name="phone"
                value={updatedDetails.phone || ""}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={userDetails.email || ""}
                disabled
              />
            </label>

            <button type="submit" className="profile-btn">
              Save
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <h2>Your Profile</h2>
            <p>
              <b>Name:</b> {userDetails.name}
            </p>
            <p>
              <b>Email:</b> {userDetails.email}
            </p>
            <p>
              <b>Phone:</b> {userDetails.phone}
            </p>

            <button onClick={handleEdit} className="profile-btn">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
