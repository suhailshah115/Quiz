import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextData } from "../Context/ContextProvider";
import ClearIcon from "@mui/icons-material/Clear";
import { handleError } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";

const StudentQuestion = () => {
  const {
    score1,
    setScore1,
    time1,
    setTime1,
    totalAttempts1,
    setTotalAttempts1,
  } = useContext(ContextData);
  const [questions, setQuestions] = useState([]); // All questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [attempts, setAttempts] = useState(0); // Attempt count for the current question
  const [animationKey, setAnimationKey] = useState(0); // Key to force re-render for animation
  const navigate = useNavigate(); // For redirecting to the home page
  const [studentName1, setStudentName1] = useState(
    localStorage.getItem("name")
  ); // Replace with dynamic student name input

  const [dragged, setDragged] = useState(false);

  useEffect(() => {
    setScore1(0);
    setTime1(0);
    setAttempts(0);
    getQuestions();
  }, []); // Empty dependency ensures this runs only on mount

  // Fetch questions from API
  const getQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/getQuestion");
      const { questions } = res.data; // Extract the questions array
      setQuestions(questions.filter((q) => q.questionType === "mcq")); // Set all questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Start the timer when the component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTime1((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion?.options || [];

  // Handle drag and drop logic

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    if (data === currentQuestion?.correctAnswer) {
      const points = attempts === 0 ? 5 : attempts === 1 ? 4 : 3;
      const updatedScore1 = score1 + points;
      setScore1(updatedScore1);
      setDragged(false); // Reset dragged state
      moveToNextQuestion(updatedScore1);
    } else {
      setAttempts((prev) => prev + 1);
      setTotalAttempts1((prev) => prev + 1);
      setDragged(false); // Reset dragged state

      if (attempts >= 2) {
        navigate("/failed");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const moveToNextQuestion = (updatedScore1) => {
    if (!dragged) {
      // Check if an option was dragged
      return  handleError("Please drag an option before moving to the next question.")

      
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAttempts(0);
      setAnimationKey((prev) => prev + 1);
    } else {
      saveScoreToDatabase(updatedScore1);
      navigate("/submit_Quiz");
    }
  };

  const saveScoreToDatabase = async (updatedScore1) => {
    const payload = {
      time1,
      studentName1,
      score1: updatedScore1,
      totalAttempts1,
      questionTypes1: "mcqs",
    };
    console.log("StudnetQuestions", payload);

    try {
      await axios.post("http://localhost:8080/createScore1", payload);
      console.log("Score saved successfully:", payload);
    } catch (error) {
      console.error("Error saving score to database:", error);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="wrapper position-relative mt-0">
        <div className="container-fluid px-4 sm:px-3">
          <div className="step_bar_content ps-5 pt-5">
            <h5 className="md:text-white flex items-center text-uppercase d-inline-block sm:text-red-700 font-bold">
              {formatTime(time1)}
              <span className="ml-10"> Attempts: {attempts}/3 </span>
            </h5>
          </div>
          <div className="flex justify-center items-center text-white text-xl mt-3 sm:text-red-700">
            <button
              className="custom-button alt text-2xl"
              style={{ backgroundColor: "#CC2A41" }}
            >
              Score : <span className="font-bold"> {score1}</span>
            </button>
          </div>
          <div className="progress_bar steps_bar flex-wrap justify-center md:justify-start mt-3 sm:mt-6 ">
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
                  height: "auto",
                  lineHeight: "30px",
                  margin: "0 8px",
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-3 sm:mt-6">
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentQuestionIndex === 0}
              className="btn sm:text-white bg-white text-black px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Previous
            </button>

            {/* Combined "Next : Submit" button for small screens only */}
            <button
              onClick={moveToNextQuestion}
              className={`button ${
                currentQuestionIndex === questions.length - 1
                  ? "submit"
                  : "next"
              } block md:hidden`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </button>

            {/* "Next" or "Submit" button for medium and larger screens */}
            <a
              className={`button ${
                currentQuestionIndex === questions.length - 1
                  ? "submit"
                  : "next"
              } mr-11 hidden md:block`}
              href="#"
              onClick={moveToNextQuestion}
              style={{ "--color": "#311668" }}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </a>
          </div>

          {questions.length > 0 ? (
            <form
              className="multisteps_form position-relative mt-[-30px]"
              id="wizard"
            >
              <div
                className="multisteps_form_panel active"
                data-animation="slideVert"
              >
                <div className="form_content">
                  <div className="row flex-wrap md:flex-nowrap">
                    <div className="col-lg-4">
                      <div className="form_title ps-5 ">
                        <h3 className="text-white text-center sm:text-left sm:text-red-700 mt-1">
                          <div className="text-[40px] font-semibold">
                          {currentQuestion?.question}
                          </div>

                          
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-4 text-center  ">
                      <div
                        className="form_img p-4 rounded-sm border-2 border-red-700 bg-white text-black text-xl font-semibold flex justify-center items-center mx-auto overflow-auto"
                        style={{
                          minHeight: "300px",
                          maxWidth: "90%",
                          position: "relative",
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        Drop Answer Here
                      </div>
                    </div>
                    <div className="col-lg-4 text-end">
                      <div className="form_items radio-list">
                        <ul
                          key={animationKey}
                          className="text-uppercase list-unstyled text-white mt-0 flex flex-row flex-wrap justify-center sm:justify-start gap-2"
                        >
                          {currentOptions.map((opt, idx) => (
                            <li key={idx}>
                              <label
                                className="step_1 rounded-pill animate__animated animate__fadeInRight animate_25ms active"
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData("text/plain", opt);
                                  setDragged(true); // Mark option as dragged
                                }}
                              >
                                <span className="label-content d-inline-block text-center rounded-pill">
                                  {opt}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-center text-white mt-4">Questions Loading...</p>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <NavLink to={"/fb"}>
            <button className="btn btn-error">filling blanks</button>
          </NavLink>
        </div>

        <div className="absolute top-4 left-4">
          <NavLink to={"/home"}>
            <ClearIcon />
          </NavLink>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default StudentQuestion;
