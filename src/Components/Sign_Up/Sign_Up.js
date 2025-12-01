import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setShowerr("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          name,
          email,
          password,
          phone,
        }),
      });

      const json = await response.json();
      console.log("Register response JSON:", json);

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("role", role);

        navigate("/");
        window.location.reload();
      } else if (json.errors && Array.isArray(json.errors)) {
        const messages = json.errors.map((err) => err.msg);
        setShowerr(messages.join(" | "));
      } else if (json.error) {
        if (typeof json.error === "string") {
          setShowerr(json.error);
        } else if (json.error.msg) {
          setShowerr(json.error.msg);
        } else {
          setShowerr(JSON.stringify(json.error));
        }
      } else {
        setShowerr("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error while registering:", err);
      setShowerr("Network error. Please try again later.");
    }
  };

  const handleReset = () => {
    setRole("patient");
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setShowerr("");
  };

  const passwordIconSrc = showPassword
    ? process.env.PUBLIC_URL + "/images/eye-open.svg"
    : process.env.PUBLIC_URL + "/images/eye-closed.svg";

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-describedby="helpId"
              >
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                aria-describedby="helpId"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                aria-describedby="helpId"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                title="Phone number must be exactly 10 digits"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                required
              />
              {showerr && (
                <div className="err" style={{ color: "red" }}>
                  {String(showerr)}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  required
                  minLength={6}
                />
                <img
                  src={passwordIconSrc}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="password-toggle-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <div className="signup-text1" style={{ textAlign: "left" }}>
              Already a member?{" "}
              <span>
                <Link to="/login" style={{ color: "#2190FF" }}>
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
