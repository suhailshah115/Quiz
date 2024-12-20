import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentInterface from "./components/StudentInterface.jsx";
import StudentQuestion from "./components/StudentQuestion.jsx";
import FillInTheBlanks from "./components/FillingBlanks.jsx";
import Register from "./components/Register.jsx";
import TeacherInterface from "./components/TeacaherInterfcae.jsx";
import Login from "./components/Login.jsx";
import ContextProvider from "./Context/ContextProvider.jsx";
import Submission from "./components/Submission.jsx";
import FailedAttempt from "./components/FailedAttempt.jsx";
import Submission1 from "./components/Submisson1.jsx";
import PrivateRoute from "./private/PrivateRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Questions from "./components/Questions.jsx";
import UserTrackingMcqs from "./components/UserTrackingMcqs.jsx";
import UserTrackingFB from "./components/UserTrackingFB.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <StudentInterface />
              </PrivateRoute>
            }
          />
          <Route
            path="/sq"
            element={
              <PrivateRoute>
                <StudentQuestion />
              </PrivateRoute>
            }
          />
          <Route
            path="/fb"
            element={
              <PrivateRoute>
                <FillInTheBlanks />
              </PrivateRoute>
            }
          />
          <Route path="/teacher" element={<TeacherInterface />} />
          <Route path="/admin" element={<Login />} />
          <Route
            path="/submit"
            element={
              <PrivateRoute>
                <Submission />
              </PrivateRoute>
            }
          />
          <Route
            path="/submit_Quiz"
            element={
              <PrivateRoute>
                <Submission1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/failed"
            element={
              <PrivateRoute>
                <FailedAttempt />
              </PrivateRoute>
            }
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
                <ErrorPage />
              </PrivateRoute>
            }
          />

          <Route path="/questions" element={<Questions />} />
          <Route path="/mcqs" element={<UserTrackingMcqs />} />
          <Route path="/fill-in-the-blanks" element={<UserTrackingFB />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>
);
