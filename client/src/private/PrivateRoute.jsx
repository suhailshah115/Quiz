import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContextData } from "../Context/ContextProvider";

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useContext(ContextData);

  // If not logged in, redirect to the login page
  return loggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
