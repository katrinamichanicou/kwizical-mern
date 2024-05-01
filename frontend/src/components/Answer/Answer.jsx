import { useState, useEffect } from "react";

const Answer = ({
  selectedTrack,
  shuffledArtistAnswerList,
  onAnswerButtonClick,
  interactionDisabled,
  time
}) => {
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [buttonColors, setButtonColors] = useState(
    new Array(4).fill("bg-box-color")
  );

  useEffect(() => {
    const storedScore = localStorage.getItem("score"); //add score to localStorage to pass it to ScorePage
    if (storedScore) {
      setScore(parseInt(storedScore));
    }
    const storedBonus = localStorage.getItem("bonus");
    if (storedBonus) {
      setBonus(parseInt(storedBonus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem("bonus", bonus.toString());
  }, [bonus]);

  const answerClick = (answer, id) => {
    const isCorrect = (selectedTrack.title === answer) || (selectedTrack.artist === answer) || (selectedTrack.album === answer);
    const newButtonColors = [...buttonColors];
    if (isCorrect) {
      setScore(score + 100);
      if (time < 5) {
        setBonus(bonus + 50); // Add bonus points only if the answer is correct and the timer is less than 5 // Save bonus to localStorage
      }

      newButtonColors[id] = "bg-correct-color";
    } else {
      newButtonColors[id] = "bg-incorrect-color";
    }
    setButtonColors(newButtonColors);
    onAnswerButtonClick();

    setTimeout(() => {
      setButtonColors(new Array(4).fill("bg-box-color"));
    }, 1600);
  };

  return (
    <>
      <div className={`grid grid-cols-1 gap-y-2 md:grid-cols-2 gap-x-40`}>
        {" "}
        {/* 'grid grid-cols-2' this turns the row of answers into two columns. Adding md: applies the changes only when the screen is wider than the md breakpoint*/}
        {shuffledArtistAnswerList.map((answer, id) => (
          <button
            key={id}
            onClick={() => answerClick(answer, id)}
            disabled={interactionDisabled}
            className={`btn overflow-hidden relative
                w-64 text-text-color py-4 px-4 rounded-xl font-bold uppercase rounded-lg shadow-md hover:text-hover-text-color
                before:block before:absolute before:h-full before:w-full
                before:left-0 before:top-0 before:-translate-y-full before:transition-transform ${buttonColors[id]
              }  
                ${buttonColors[id] === "bg-box-color"
                ? "hover:bg-hover-color"
                : ""
              } 
            `}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <h1 className="results-header text-2xl font-bold text-question-text-color">
          Results
        </h1>
        <p className="text-question-text-color">Your Score: {score}</p>
        {buttonColors.includes("bg-correct-color") && (
          <div className="bg-correct-color border border-green-500 rounded-xl">
            <p className="text-white">Correct!</p>
          </div>
        )}
        {buttonColors.includes("bg-incorrect-color") && (
          <div className="bg-incorrect-color border border-red-500 rounded-xl">
            <p className="text-white">Wrong!</p>
          </div>
        )}
        <p className="text-question-text-color">Speed Bonus: {bonus}</p>
      </div>
    </>
  );
};

export default Answer;
