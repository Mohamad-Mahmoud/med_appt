import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
  const navigate = useNavigate();

  const authtoken = sessionStorage.getItem("auth-token");
  const email = sessionStorage.getItem("email");

  let displayName = "";
  if (email) {
    displayName = email.split("@")[0];
    displayName =
      displayName.charAt(0).toUpperCase() + displayName.slice(1);
  }

  const handleClick = () => {
    const navLinks = document.querySelector(".nav__links");
    const navIcon = document.querySelector(".nav__icon i");

    if (!navLinks || !navIcon) return;

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      navIcon.classList.remove("fa-bars");
      navIcon.classList.add("fa-times");
    } else {
      navIcon.classList.remove("fa-times");
      navIcon.classList.add("fa-bars");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("email");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          <svg
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.3917 2.40445C8.94147 -0.636616 4.56401 -0.819655 1.89509 2.00736C0.0252165 3.98798 -0.460901 6.8792 0.436685 9.33335H5.22124L8.27674 3.22459L11.7767 10.2235L13.5267 6.7246L14.8311 9.33335H23.1169C24.0144 6.87925 23.5283 3.98798 21.6585 2.00736C18.9895 -0.8196 14.6121 -0.636616 12.1618 2.40445L11.7768 2.88236L11.3917 2.40445ZM21.6894 11.6667H13.6644L11.7767 15.4421L8.27674 8.442L6.66444 11.6667H1.86419C1.87444 11.6777 1.88474 11.6887 1.89509 11.6996L11.7718 22.1614L11.7767 22.1667H11.7767L21.6584 11.6996C21.6688 11.6887 21.6791 11.6777 21.6893 11.6667"
              fill="#0088FF"
            />
            <title>Heart Shape SVG icon</title>
          </svg>
        </Link>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className="fa fa-times fa fa-bars"></i>
      </div>

      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>

        <li className="link">
          <Link to="/instant-consultation">Consultation</Link>
        </li>

        {!authtoken && (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}

        {authtoken && (
          <>
            <li className="link welcome-user">
              <span className="nav-username">Welcome, {displayName}</span>
              <ul className="dropdown-menu">
                <li>
                  <ProfileCard />
                </li>
              </ul>
            </li>

            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
