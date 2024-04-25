import { useState } from "react";

// import "./Score.css";

const Score = () => {
  const [score, setScore] = useState(0);

  //'isCorrect' will be the name of the state or function used in the question component 
  //to check if answer is correct or not
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <div className="score">
      <h1>Results</h1>
      <p>Your Score: {score}</p>
      {/* You can call handleAnswer directly where you need it */}
      <button onClick={() => handleAnswer(true)}>Correct Answer</button>
    </div>
  );
};

export default Score
