import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { ContextData } from "../Context/ContextProvider";
import { handleError } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";

const Register = () => {
	const { setLoggedIn,loggedIn } = useContext(ContextData);

  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["name", "email", "password"].includes(name)) {
      setSignupData({ ...signupData, [name]: value });
    }
    if (["email", "password"].includes(name)) {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  
  const handleSignup = async () => {
    try {
      console.log("Signup data submitted:", signupData);
      const signupResponse = await axios.post("http://localhost:8080/signup", {
        Fname: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      if (signupResponse.data.success) {
        console.log("Signup successful, auto-login initiated");
        const loginResponse = await axios.post("http://localhost:8080/login", {
          email: signupData.email,
          password: signupData.password,
        });

        if (loginResponse.data.success) {
          localStorage.setItem("token", loginResponse.data.token);
          localStorage.setItem("name", loginResponse.data.Fname);
          setLoggedIn(true);
          navigate("/home");
        } else {
          setError("Auto-login after signup failed.");
        }
      } else {
        handleError(signupResponse.data.msg || "Signup failed.");
      }
    } catch (err) {
      handleError(err.response?.data?.msg || "email already exist");
    }
  };

  const handleLogin = async () => {
    try {
      console.log("Login data submitted:", loginData);
      const response = await axios.post("http://localhost:8080/login", {
        email: loginData.email,
        password: loginData.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.Fname);
        setLoggedIn(true);
        navigate("/home");
      } else {
        setError("Login failed.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login error occurred.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth...");


    
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };



  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              onChange={handleInputChange}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              onChange={handleInputChange}
                              autoComplete="off"
                            />
                          </div>
                          <button onClick={handleLogin} className="btn mt-4">Submit</button>
                          <div className="flex justify-center gap-4 mt-6">
                            <GoogleIcon onClick={handleGoogleLogin} fontSize="small" />
                            {/* <FacebookIcon fontSize="small" /> */}
                          </div>
                          <p className="mb-0 mt-4 text-center">
                            <NavLink to={'/admin'}>

                            <a href="#0" className="link">
                        Admin_Panel
                            </a>
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              className="form-style"
                              placeholder="Your Full Name"
                              onChange={handleInputChange}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              onChange={handleInputChange}
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              onChange={handleInputChange}
                              autoComplete="off"
                            />
                          </div>
                     
                  
                          <button onClick={handleSignup} className="btn mt-4">
                            Submit
                          </button>
                          {error && <p className="error">{error}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
