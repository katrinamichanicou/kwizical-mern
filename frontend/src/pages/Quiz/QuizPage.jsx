import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudioButton from "../../components/AudioButton/AudioButton";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import { artistAnswers } from "../../../helpers/answer_generator";
import GenrePicker from "../../components/GenrePicker/GenrePicker";

export const QuizPage = () => {
  const [shuffledArtistAnswerList, setShuffledArtistAnswerList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedBackground, setSelectedBackground] =
    useState("custom-background");
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const navigate = useNavigate();

  const handleAnswerButtonClick = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    if (questionsAnswered === 4) {
      setTimeout(() => {
        navigate("/results");
      }, 750);
    }
  };

  useEffect(() => {
    if (questionsAnswered < 5) {
      artistAnswers(selectedGenre).then(
        ({ selectedTrack, shuffledArtistAnswerList }) => {
          setShuffledArtistAnswerList(shuffledArtistAnswerList);
          setSelectedTrack(selectedTrack);
        }
      );
    }
  }, [selectedGenre, questionsAnswered]);

  const handleGenrePicker = (genreID, backgroundClass) => {
    setSelectedGenre(genreID);
    setSelectedBackground(backgroundClass);
  };

  return (
    <>
      {selectedGenre === 0 ? (
        // <div className="min-h-screen bg-homepage-background-2 bg-full">
        <div className="relative w-full h-screen bg-full bg-center overflow-hidden animate-bg-transition-continuous">
          <GenrePicker onGenreSelect={handleGenrePicker}></GenrePicker>
        </div>
      ) : (
        <>
          <div
            className={
              `absolute inset-0 flex flex-col items-center justify-center 
            animate__animated animate__slideInRight ${selectedBackground} bg-cover`
              // The above Tailwind code applies the sliding animation to the transition from the genre 'page' to the quiz 'page'
            }
          >
            <div className="text-2xl text-white">
              Question {questionsAnswered + 1} of 5
            </div>
            <div className="p-5">
              <AudioButton trackPreview={selectedTrack.preview} />
            </div>
            <div className="p-5 text-2xl">
              <Question questionType="artist" />
            </div>
            <div className="p-5">
              <Answer
                shuffledArtistAnswerList={shuffledArtistAnswerList}
                selectedTrack={selectedTrack}
                onAnswerButtonClick={handleAnswerButtonClick}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
