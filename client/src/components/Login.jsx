import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { handleError } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTeacherPhase = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    
    // Validate email and password
    if (email === "admin30@.com" && password === "admin12345") {
      // Navigate to teacher page if credentials are correct
      navigate("/teacher");
    } else {
      handleError("Invalid email or password!")
    }
  };

  return (
    <div className="h-screen bg-slate-700">
      <div className="login-box bg-red-500">
        <h2>Login</h2>
        <form onSubmit={handleTeacherPhase}>
          {/* Username input */}
          <div className="user-box">
            <input
              type="text"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Username</label>
          </div>

          {/* Password input */}
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-error">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
