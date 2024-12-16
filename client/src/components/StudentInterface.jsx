import React from "react";
import bann_img from "../../public/assets/images/bann_img.png"; // Import the image correctly
import btnImg from "../../public/assets/images/btn.png"; // Import the image correctly
import { NavLink } from "react-router-dom";


const StudentInterface = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(../../public/assets/images/banner.jpg)", // Make sure this path is correct too
        }}
      >
        <div className="hero-overlay bg-opacity-0"></div>

        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={bann_img} // Use the imported image here
            className="w-auto"
            alt="Banner"
          />
          <div>
            <img className="mb-8" src={btnImg} alt="" srcset="" />
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
          {/* <div className="absolute top-4 right-4">
            <NavLink to={"/admin"}>
              <button className="btn btn-primary">Teacher Interface</button>
            </NavLink>
          </div> */}
        </div>

      
      </div>
    </div>
  );
};

export default StudentInterface;
