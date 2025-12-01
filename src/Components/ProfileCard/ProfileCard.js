import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const storedName = sessionStorage.getItem("name") || "";
  const email = sessionStorage.getItem("email") || "";
  const phone = sessionStorage.getItem("phone") || "";

  let displayName = storedName;
  if (!displayName && email) {
    const prefix = email.split("@")[0];
    displayName =
      prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }
  if (!displayName) {
    displayName = "User";
  }

  return (
    <div className="profile-card">
      <h3>Your Profile</h3>
      <p>
        <strong>Name:</strong> {displayName}
      </p>
      {email && (
        <p>
          <strong>Email:</strong> {email}
        </p>
      )}
      {phone && (
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      )}
    </div>
  );
};

export default ProfileCard;
