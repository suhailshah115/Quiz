const express = require("express");
const { CreateScore, GetScore } = require("../controller/TrackController");

const trackRoute = express.Router();

// Define the route that calls the CreateScore function from the controller
trackRoute.post("/createScore", CreateScore);
trackRoute.get("/getScore", GetScore);

module.exports = trackRoute;
