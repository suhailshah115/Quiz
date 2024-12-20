import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";


const StudentInterface = () => {
  const naviagte=useNavigate()


  const handleLogout=()=>{
    localStorage.removeItem("name")
    localStorage.removeItem("token")
    console.log("YES DELETE")
    handleSuccess("You have successfully logged out")
    setTimeout(() => {
      naviagte("/")
    }, 1000);
  }

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(assets/images/banner.jpg)", // Make sure this path is correct too
        }}
      >
        <div className="hero-overlay bg-opacity-0"></div>

        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="assets/images/bann_img.png"// Use the imported image here
            className="w-auto"
            alt="Banner"
          />
          <div>
            <img className="mb-8" src="/assets/images/btn.png" alt="" srcset="" />
            <h1 className="text-5xl font-bold text-white">
            Gamified E_Learning
            </h1>
            <p className="py-6 text-white ">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <NavLink to={"/sq"}>
              <button className="btn btn-primary">Get Started</button>
            </NavLink>
       
          </div>
          <div className="absolute top-4 left-4">
          
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
  
          </div>
        </div>

      
      </div>
      <ToastContainer/>
    </div>
  );
};

export default StudentInterface;
