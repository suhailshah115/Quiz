import React, { createContext, useState } from "react";

const ContextData = createContext();

const ContextProvider = ({ children }) => {
  const [score, setScore] = useState(0); // Track score
  const [score1, setScore1] = useState(0); // Track score
  const [attempts, setAttempts] = useState(0); // Track attempts
  const [time, setTime] = useState(0); // Track time
  const [time1, setTime1] = useState(0); // Track time
  const [loggedIn, setLoggedIn] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalAttempts1, setTotalAttempts1] = useState(0);

  return (
    <ContextData.Provider
      value={{
        score,
        setScore,
        attempts,
        setAttempts,
        time,
        setTime,
        time1,
        setTime1,
        score1,
        setScore1,
        setLoggedIn,
        loggedIn,
        totalAttempts,
        setTotalAttempts,
        totalAttempts1,
        setTotalAttempts1,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};

export default ContextProvider;
export { ContextData };
