import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { handleSuccess, handleError } from "../Logics/Toast";
import { ToastContainer } from "react-toastify";

const TeacherInterface = () => {
  const [allQ, setAllQ] = useState();
  const [questionType, setQuestionType] = useState("mcq");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [columnA, setColumnA] = useState(["", "", "", "", ""]);
  const [columnB, setColumnB] = useState(["", "", "", "", ""]);
  const [mcqMode, setMcqMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      questionType: mcqMode ? "mcq" : questionType,
      question,
      options:  questionType === "match-the-following" ||questionType === "mcq" ? options : undefined,
      correctAnswer,
      columnA: questionType === "match-the-following" ? columnA : undefined,
      columnB: questionType === "match-the-following" ? columnB : undefined,
    };

    console.log("Submitting payload:", payload); // Log the payload

    try {
      const response = await axios.post("http://localhost:8080/createQuestion", payload);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setColumnA(["", "", "", "", ""]);
      setColumnB(["", "", "", "", ""]);
      handleSuccess("Question added successfully!");
    } catch (error) {
      console.error("Error submitting question:", error);
      handleError("There was an error submitting the question.");
    }
  };

  const handleOptionChange = (index, newOption) => {
    const updatedOptions = [...options];
    updatedOptions[index] = newOption;
    setOptions(updatedOptions);
  };

  const handleColumnAChange = (index, newValue) => {
    const updatedColumnA = [...columnA];
    updatedColumnA[index] = newValue;
    setColumnA(updatedColumnA);
  };

  const handleColumnBChange = (index, newValue) => {
    const updatedColumnB = [...columnB];
    updatedColumnB[index] = newValue;
    setColumnB(updatedColumnB);
  };

  const getQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/getQuestion");
      const { questions } = res.data;
      setAllQ(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleQuizIcon = () => {
    navigate("/questions");
  };

  const handleAnalyticsClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAnalyticsNavigation = (type) => {
    setOpenDialog(false);
    if (type === "mcq") navigate("/mcqs");
    if (type === "fill-in-the-blanks") navigate("/fill-in-the-blanks");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen">
      <NavLink to={"/home"}>
        <button className="btn btn-active btn-accent text-center flex">
          Back
        </button>
      </NavLink>
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Interactive Question
      </h1>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Question Type</label>
        <select
          className="select select-bordered w-full"
          value={questionType}
          onChange={(e) => {
            setQuestionType(e.target.value);
            setMcqMode(false);
          }}
        >
          <option value="mcq">Multiple Choice Question</option>
          <option value="fill-in-the-blanks">Fill in the Blanks</option>
          <option value="match-the-following">Match the Following</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Question</label>
        <input
          type="text"
          placeholder="Enter your question"
          className="input input-bordered w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      {(questionType === "mcq" || mcqMode) && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Options</label>
          {Array.isArray(options) &&
            options.map((option, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}

          <label className="block mb-2 font-medium">Correct Answer</label>
          <select
            className="select select-bordered w-full"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <option value="">Select the correct answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      {questionType === "fill-in-the-blanks" && !mcqMode && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Correct Answer</label>
          <input
            type="text"
            placeholder="Enter the correct answer"
            className="input input-bordered w-full"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
      )}
      {questionType === "match-the-following" && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Column A</label>
          {Array.isArray(columnA) &&
            columnA.map((item, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={item}
                  placeholder={`Column A ${index + 1}`}
                  onChange={(e) => handleColumnAChange(index, e.target.value)}
                />
              </div>
            ))}
          <label className="block mb-2 font-medium">Column B</label>
          {Array.isArray(columnB) &&
            columnB.map((item, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={item}
                  placeholder={`Column B ${index + 1}`}
                  onChange={(e) => handleColumnBChange(index, e.target.value)}
                />
              </div>
            ))}
          <label className="block mb-2 font-medium">Options</label>
          {Array.isArray(options) &&
            options.map((option, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}
          <label className="block mb-2 font-medium">Correct Answer</label>
          <select
            className="select select-bordered w-full"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <option value="">Select the correct answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      <button onClick={handleSubmit} className="btn btn-block bg-red-700">
        Submit
      </button>
      <div className="absolute top-5 right-6 flex">
        <Badge badgeContent={allQ?.length} color="info">
          <QuizIcon onClick={handleQuizIcon} style={{ color: "#feeaa7 ", fontSize: '2rem' }} />
        </Badge>
      </div>
      <div className="absolute top-5 left-6 flex">
        <AnalyticsIcon onClick={handleAnalyticsClick} style={{ fontSize: '2rem', color: "#feeaa7 " }} />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            padding: "16px",
          }}
        >
          <Typography align="center">Select Analytics Mode</Typography>
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "#34495e",
            color: "#ecf0f1",
            padding: "16px",
          }}
        >
          <Typography>Choose the type of questions to analyze:</Typography>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: "#2c3e50",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => handleAnalyticsNavigation("mcq")}
            style={{
              backgroundColor: "#e74c3c",
              color: "#ecf0f1",
              margin: "0 8px",
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          >
            Analyze MCQs
          </Button>
          <Button
            onClick={() => handleAnalyticsNavigation("fill-in-the-blanks")}
            style={{
              backgroundColor: "#e74c3c",
              color: "#ecf0f1",
              margin: "0 8px",
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          >
            Analyze Fill-in-the-Blanks
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </div>
  );
};

export default TeacherInterface;