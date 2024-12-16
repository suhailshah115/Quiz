import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink } from 'react-router-dom';
import { handleSuccess } from '../Logics/Toast';
import { ToastContainer } from 'react-toastify';



const Questions = () => {
  const [questions, setQuestions] = useState([]); // Initializing with an empty array
  const [loading, setLoading] = useState(true); // Loading state to manage spinner visibility

  // Fetch questions from API
  const getQuestions = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get("http://localhost:8080/getQuestion");
      console.log(res.data);
      setQuestions(res.data.questions); // Correctly set the questions from the response
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Delete question by id
  const deleteQuestion = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/deleteQuestion/${id}`);
      // Update state to remove the deleted question
      setQuestions((prev) => prev.filter((item) => item._id !== id));
      handleSuccess("Question deleted!")
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="p-6">
      <div className="absolute top-0 left-2">
        <NavLink to={"/teacher"}>
          <KeyboardBackspaceIcon />
        </NavLink>
      </div>

      {loading ? (
        // Display loading spinner while fetching data
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : questions.length > 0 ? (
        questions.map((questionData) => (
          <div
            key={questionData._id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-gray"
          >
            <div>
              <strong>Question Type:</strong> {questionData.questionType}
            </div>
            <div>
              <strong>Question:</strong> {questionData.question}
            </div>
            <Button
              onClick={() => deleteQuestion(questionData._id)} // Pass the question id to the delete function
              variant="outlined"
              color="error"
              className="mt-4"
            >
              Delete
            </Button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No questions available.</p>
      )}
<ToastContainer/>
    </div>

  );
};

export default Questions;
