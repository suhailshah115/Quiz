const express = require("express");
const { CreateScore, GetScore, GetScore2 } = require("../controller/TrackController2");

const trackRoute = express.Router();

// Define the route that calls the CreateScore function from the controller
trackRoute.post("/createScore2", CreateScore2);
trackRoute.get("/getScore2", GetScore2);

module.exports = trackRoute2;
