const { number, required, string } = require("joi");
const mongoose = require("mongoose");

const TrackSchema2 = new mongoose.Schema({
  studentName2: {
    type: String,
    required: true,
  },
  score2: {
    type: Number,
    required: true,
  },
  totalAttempts2: {
    type: Number,
    required: true,
  },
  questionTypes2: {
    type: String,
    required: true,
  },
  time2:{
    type:String,
    required:true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Automatically sets the current date and time
  },
});

const TrackMcqs = mongoose.model("track2", TrackSchema2);
module.exports = TrackMtf;
