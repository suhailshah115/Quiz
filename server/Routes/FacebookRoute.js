const express = require("express");
const { handleFacebookCreate } = require("../controller/UserController");

const facebookRoute = express.Router();


facebookRoute.post("/auth/facebook",handleFacebookCreate)

module.exports = facebookRoute;
