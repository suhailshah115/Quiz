import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { ContextData } from "../Context/ContextProvider";
import { handleError } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";

import FacebookLogin from "@greatsumini/react-facebook-login";

const Register = () => {
  const { setLoggedIn, loggedIn } = useContext(ContextData);




  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      handleError(err.response?.data?.error || "Login error occurred.");
    }
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const Fname = params.get("Fname");

    if (Fname) {
      localStorage.setItem("name", Fname); // Save Fname to localStorage
      setLoggedIn(true);
      navigate("/home");
      console.log("Fname saved to localStorage:", Fname);
    }
  }, [location]);

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google OAuth...");
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };





  const HandleFacebookRes = async (response) => {
    const userFacebookData = {
      Fname: response.name, // Map Facebook name to Fname
      id: response.id,      // Use Facebook's unique ID
    };
  
    console.log("User Facebook Data:", userFacebookData);
  
    try {
      // Send user data to the backend
      const res = await axios.post("http://localhost:8080/auth/facebook", userFacebookData);
  
      if (res.data.success) {
        console.log("User successfully saved:", res.data.user);
  
        // Save the Fname to localStorage
        localStorage.setItem("name", res.data.user.Fname);
        setLoggedIn(true)
        navigate("/home")
  
        // You can now access this Fname in other parts of your app
        console.log("Fname saved to localStorage:", res.data.user.Fname);
      } else {
        console.error("Error from backend:", res.data.message);
      }
    } catch (error) {
      console.error("Error saving user to backend:", error);
    }
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
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
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
                          <button onClick={handleLogin} className="btn mt-4">
                            Submit
                          </button>
                          <div className="flex justify-center gap-4 mt-6">
                          
                          <GoogleIcon style={{color:"white",cursor: "pointer"}}
                              onClick={handleGoogleLogin}
                              fontSize="small"
                            />
<FacebookLogin
        appId="1269513297636250"
        onSuccess={(response) => {
          console.log("Login Success!", response);
        }}
    
        onProfileSuccess={HandleFacebookRes}
        render={({ onClick }) => (
          <div
            className="facebook-custom-btn"
            onClick={onClick}
            style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}
          >
            <FacebookIcon fontSize="small" style={{ color: "white", marginRight: "8px" }} />
          </div>
        )}
      />



                          
                          </div>
                          <p className="mb-0 mt-4 text-center">
                            <NavLink to={"/admin"}>
                              <a href="#0" className="link">
                                Admin Panel
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
      <ToastContainer />
    </div>
  );
};

export default Register;
