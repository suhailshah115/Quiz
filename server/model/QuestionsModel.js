const mongoose = require("mongoose");

// Mongoose Schema for Questions
const QuestionSchema = mongoose.Schema({
  questionType: {
    type: String,
    enum: ["mcq", "fill-in-the-blanks"],
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
        return this.questionType === "mcq" ? value.length === 4 : true;
      },
      "MCQ must have exactly 4 options",
    ],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("question", QuestionSchema);

module.exports={Question}