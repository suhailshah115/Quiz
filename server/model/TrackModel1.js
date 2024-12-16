const { number, required, string } = require("joi");
const mongoose = require("mongoose");

const TrackSchema1 = new mongoose.Schema({
  studentName1: {
    type: String,
    required: true,
  },
  score1: {
    type: Number,
    required: true,
  },
  totalAttempts1: {
    type: Number,
    required: true,
  },
  questionTypes1: {
    type: String,
    required: true,
  },
  time1:{
    type:String,
    required:true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Automatically sets the current date and time
  },
});

const TrackMcqs = mongoose.model("track1", TrackSchema1);
module.exports = TrackMcqs;
