import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import logo from "../../assets/Kwizical_logo_no_bg_cropped.png"

import "./HomePage.css";


export const HomePage = () => {
  return (
    <div className="min-h-screen bg-full bg-cover bg-homepage-background-2 font-montserrat overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="w-full md:w-1/2 lg:pr-8">
          <div className="md:p-8 md:pl-16 rounded-lg sm:text-left xs:px-4">
            <img
              src={logo}
              alt="Kwizical-logo"
              className="w-80 h-80"
            />
            <div className="sm:text-8xl font-semibold text-white py-8 xs:text-4xl">{"LET'S GET KWIZICAL!"}</div>
            <div className="text-xl text-white mb-8">
              A fun and challenging quiz game to test your music knowledge!
            </div>
          </div>

        </div>


        <div className="w-full md:w-1/2 md:py-64">
          <h2 className="text-2xl font-bold mb-4 text-white">
            HOW TO PLAY
          </h2>
          <ol className="list-decimal list-inside text-lg text-gray-600 mb-4 text-white">
            <li>SELECT A GENRE OF MUSIC</li>
            <li>LISTEN TO THE SONG</li>
            <li>SELECT THE ANSWER</li>
            <li>Earn points for correct answers</li>
            <li>Earn bonus points for a perfect score</li>
            <li>And answer quickly for more points!</li>
            {/* <li>Compete with other players on the leaderboard</li> */}
          </ol>

          <div className="p-2 "><GoogleAuth /></div>
          <div className="p-2">
            <Link
              to="/kwizical"
              className="bg-hot-pink text-white px-10 py-3 rounded-lg hover:bg-white hover:text-hot-pink hover:border-hot-pink hover:border-2"
            >
              Play as guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



