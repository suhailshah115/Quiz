const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalAttempts: {
    type: Number,
    required: true,
  },
  questionTypes: {
    type: String,
    required: true,
  },
  time:{
    type:String,
    required:true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now, // Automatically sets the current date and time
  },
});

const Track = mongoose.model("track", TrackSchema);
module.exports = Track;
