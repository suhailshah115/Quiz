const express = require("express");
const { CreateScore1, GetScore1 } = require("../controller/TrackController1");

const trackRoute1 = express.Router();

// Define the route that calls the CreateScore function from the controller
trackRoute1.post("/createScore1", CreateScore1);
trackRoute1.get("/getScore1", GetScore1);


module.exports = trackRoute1;
