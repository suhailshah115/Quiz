import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ContextData } from "../Context/ContextProvider";
import ClearIcon from "@mui/icons-material/Clear";
import { handleError } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";

const FillInTheBlanks = () => {
  // Context to manage global state for score, time, and attempts
  const {
    score,
    setScore,
    time,
    setTime,
    attempts,
    setAttempts,
    totalAttempts,
    setTotalAttempts,
  } = useContext(ContextData);

  // State variables
  const [questions, setQuestions] = useState([]); // Stores the questions fetched from the API
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question index
  const [userAnswer, setUserAnswer] = useState(""); // Stores the user's answer input
  const [studentName, setStudentName] = useState(localStorage.getItem("name")); // Retrieves the student name from localStorage

  const navigate = useNavigate(); // Hook to navigate between pages

  // Initialize state and fetch questions when the component mounts
  useEffect(() => {
    setScore(0); // Reset score
    setTime(0); // Reset timer
    setAttempts(0); // Reset attempts
    setTotalAttempts(0); // Reset total attempts
    getQuestions(); // Fetch questions from the API
  }, []);

  // Fetch questions from the backend API
  const getQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/getQuestion");
      const { questions } = res.data;
      // Filter questions to only include fill-in-the-blank type
      setQuestions(
        questions.filter((q) => q.questionType === "fill-in-the-blanks")
      );
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Handle "Enter" key press to submit the answer
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Submit the answer
    }
  };

  // Handle the submission of the user's answer
  const handleSubmit = () => {
    if (userAnswer.trim() === "") {
      // Show error if input is empty
      return handleError("Please fill in the input.");
    }

    const currentQuestion = questions[currentQuestionIndex]; // Get the current question
    const isCorrect =
      userAnswer.trim() === currentQuestion.correctAnswer.trim(); // Check if the answer is correct

    if (isCorrect) {
      // If the answer is correct
      const scoreIncrement = 5 - (attempts - 1); // Calculate score increment based on attempts
      const newScore = score + scoreIncrement; // Update the score
      setScore(newScore); // Set the new score

      if (currentQuestionIndex < questions.length - 1) {
        // If not the last question
        setCurrentQuestionIndex((prev) => prev + 1); // Move to the next question
        setAttempts(0); // Reset attempts for the next question
        setUserAnswer(""); // Clear the input field
      } else {
        // If the last question
        saveScoreToDatabase(newScore); // Save the score to the database
        navigate("/submit"); // Navigate to the submit page
      }
    } else {
      // If the answer is incorrect
      if (attempts < 3) {
        // Allow up to 3 attempts
        setTotalAttempts((prev) => prev + 1); // Increment total attempts
        setAttempts((prev) => prev + 1); // Increment attempts
      } else {
        // If attempts exceed 3
        saveScoreToDatabase(score); // Save the current score
        navigate("/failed"); // Navigate to the failed page
      }
    }
  };

  // Save the score to the backend database
  const saveScoreToDatabase = async (updatedScore) => {
    const questionTypes = questions[0]?.questionType || "Unknown"; // Get the question type
    const payload = {
      studentName,
      time,
      score: updatedScore, // Use the updated score
      totalAttempts,
      questionTypes,
    };

    try {
      await axios.post("http://localhost:8080/createScore", payload);
      console.log("Score saved successfully");
    } catch (error) {
      console.error("Error saving score to database:", error);
    }
  };

  // Timer logic to track the elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format the time in MM:SS format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/blank1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Progress Bar */}
      <div className="absolute top-4 left-4 w-full px-6 mt-5">
        <div className="progress_bar steps_bar mt-3 ps-5 d-inline-block">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`step rounded-pill d-inline-block text-center position-relative ${
                currentQuestionIndex === index ? "active current" : ""
              }`}
              style={{
                backgroundColor:
                  currentQuestionIndex >= index ? "white" : "gray",
                color: "black",
                width: "30px",
                height: "30px",
                lineHeight: "30px",
                margin: "0 8px",
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Main Question and Input */}
      <div className="bg-base-200 bg-opacity-80 p-6 md:p-8 rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[50%]">
        {questions.length > 0 ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
              Fill in the Blank
            </h2>
            <p className="text-base md:text-xl text-gray-700 mb-6 text-center">
              {questions[currentQuestionIndex].question.replace(
                "_____",
                <span className="font-semibold">_____</span>
              )}
            </p>

            <input
              onKeyDown={handleKeyPress}
              type="text"
              className="text-gray-700 w-full p-3 md:p-4 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your answer here"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />

            <div className="flex justify-center mt-10">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>

            <div className="mt-4 text-center text-white">
              <p>Attempts: {attempts}/3</p>
            </div>
          </>
        ) : (
          <p className="text-gray-700 text-center">Loading questions...</p>
        )}
        <NavLink to={"/sq"}>
          <div className="flex justify-center mt-11">
            <button className="bg-red-600 text-black px-6 py-2 rounded-lg ">
              Drag and Drop
            </button>
          </div>
        </NavLink>
      </div>

      {/* Score Display */}
      <div className="absolute top-4 center">
        <button
          className="custom-button alt text-2xl"
          style={{ backgroundColor: "#CC2A41" }}
        >
          Score : <span className="font-bold"> {score}</span>
        </button>
      </div>

      {/* Timer Display */}
      <div className="absolute top-4 right-4">
        <span className="font-bold text-2xl"> {formatTime(time)}</span>
      </div>

      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <NavLink to={"/home"}>
          <ClearIcon />
        </NavLink>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FillInTheBlanks;
