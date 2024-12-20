import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextData } from "../Context/ContextProvider";

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useContext(ContextData);

  if (loggedIn === undefined) {
    // Show a loader while waiting for the loggedIn state to initialize
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to the login page
  return loggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
