const mongoose = require("mongoose");

// Mongoose Schema for Questions
const QuestionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ["mcq", "fill-in-the-blanks", "match-the-following"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    validate: [
      function (value) {
        return (this.questionType === "mcq" || this.questionType === "match-the-following") ? value.length === 4 : true;
      },
      "MCQ must have exactly 4 options",
    ],
  },
  columnA: {
    type: [String],
    validate: [
      function (value) {
        return this.questionType === "match-the-following" ? value.length === 5 : true;
      },
      "Column A must have exactly 5 entries",
    ],
  },
  columnB: {
    type: [String],
    validate: [
      function (value) {
        return this.questionType === "match-the-following" ? value.length === 5 : true;
      },
      "Column B must have exactly 5 entries",
    ],
  },
  
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = { Question };