import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ContextData } from '../Context/ContextProvider';

const Submission = () => {
 const StudentName= localStorage.getItem("name")

  const { score1, time1 } = useContext(ContextData);
  const [showImage, setShowImage] = useState(true);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Hide the image after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 2000); // 1 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="hero bg-white min-h-screen flex items-center justify-center">
      {showImage ? (
        <div className="text-center">
          <h1 className="text-5xl font-bold">Hello! {StudentName}</h1>
          <p className="py-6">
            <img
              src="https://cdn.prod.website-files.com/5ef0df6b9272f7410180a013/60c0e28575cd7c21701806fd_q1cunpuhbdreMPFRSFLyfUXNzpqv_I5fz_plwv6gV3sMNXwUSPrq88pC2iJijEV7wERnKXtdTA0eE4HvdnntGo9AHAWn-IcMPKV-rZw1v75vlTEoLF4OdNqsRb7C6r7Mvzrm7fe4.png"
              alt="Celebration"
            />
          </p>
        </div>
      ) : (
        <div className="hero min-h-screen relative">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/assets/images/background_video.mp4" type="video/mp4" />
        </video>
      
        <div
          className="text-center bg-gray-100 p-8 rounded-lg shadow-lg mb-76 transition-transform transform hover:scale-105 hover:shadow-2xl mb-96"
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative', // Make sure content stays on top of the video
            zIndex: 2,
          }}
        >
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Quiz Completed!</h1>
          <p className="text-lg text-gray-600 mb-4">
            {StudentName}, your score is: <strong className="text-blue-600">{score2}</strong>
          </p>
          <p className="text-lg text-gray-600">
            Your total time is: <strong className="text-green-600">{formatTime(time2)}</strong>
          </p>
          <NavLink to="/home">
            <button
              className="btn btn-primary mt-6 py-2 px-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Reset
            </button>
          </NavLink>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default Submission;
