const { Question } = require("../model/QuestionsModel");

const QuestionCreate = async (req, res) => {
  try {
    const { questionType, question, options, correctAnswer } = req.body;

    // Validation for MCQ options
    if (questionType === "mcq" && (!options || options.length !== 4)) {
      return res.status(400).json({
        message: "MCQ questions must have exactly 4 options.",
      });
    }

    const newQuestion = new Question({
      questionType,
      question,
      options: questionType === "mcq" ? options : undefined,
      correctAnswer,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({
        message: "Question created successfully!",
        question: newQuestion,
      });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Function to Get Questions
const QuestionGet = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const QuestionDelete = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the question by ID
    const questionFind = await Question.findById(id);
    if (!questionFind) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Delete the question by ID
    await Question.findByIdAndDelete(id);  // Correct method to delete

    res.status(200).json({ msg: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { QuestionCreate, QuestionGet,QuestionDelete };
