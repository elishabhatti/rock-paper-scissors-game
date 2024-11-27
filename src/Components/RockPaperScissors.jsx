import React, { useState } from "react";
import Score from "./Score";
import Choice from "./Choice";

const RockPaperScissors = () => {
  const choices = [
    { name: "Rock", image: "/images/rock.png" },
    { name: "Paper", image: "/images/Paper.png" },
    { name: "Scissors", image: "/images/scissors.png" },
  ];

  const [userSelection, setUserSelection] = useState("");
  const [computerSelection, setComputerSelection] = useState("");
  const [myScore, setMyScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [result, setResult] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const playGame = (userSelect) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerSelect = choices[randomIndex];

    setUserSelection(userSelect);
    setComputerSelection(computerSelect);

    determineWinner(userSelect.name, computerSelect.name);
  };

  const determineWinner = (user, computer) => {
    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setMyScore((prevScore) => prevScore + 1);
    } else if (user !== computer) {
      setCompScore((prevScore) => prevScore + 1);
    }
    if (myScore >= 10 && compScore <= 10) {
      setResult("Congratulations You Won!");
      setGameOver(true);
    } else if (myScore <= 10 && compScore >= 10) {
      setResult("You Lost!");
      setGameOver(true);
    } else if (myScore === 10 && compScore === 10) {
      setResult("It's a Draw!");
    }
  };

  const handleRefresh = () => {
    setMyScore(0);
    setCompScore(0);
    setResult("");
    setUserSelection("");
    setComputerSelection("");
    setGameOver(false);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center mb-10 ">
      <div className="w-full bg-gray-900 text-white flex flex-col sm:flex-row justify-between items-center py-4 px-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase mb-4 sm:mb-0">R.P.S Game</h1>
        <h2 className="text-lg sm:text-xl uppercase text-center sm:text-right">
          Winning Score: <b>10</b>
        </h2>
        <div className="flex-col gap-6">
          <Score lable="Your Score" score={myScore} />
          <Score lable="Computer Score" score={compScore} />
        </div>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-center mt-10  mb-10">
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => playGame(choice)}
            disabled={gameOver}
            className="transform hover:scale-110 transition-all duration-200"
          >
            <img
              src={choice.image}
              alt={choice.name}
              className="w-24 h-24 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg border-2 border-white"
            />
          </button>
        ))}
      </div>

      {/* Selections */}
      <div className="text-center mb-8">
        <Choice label="You Selected" choice={userSelection.name} />
        <Choice label="Computer Selected" choice={computerSelection.name} />
        <h2
          className={`text-xl sm:text-2xl font-semibold mt-6 ${
            result === "Congratulations You Won!"
              ? "text-green-400"
              : result === "You Lost!"
              ? "text-red-400"
              : "text-yellow-300"
          }`}
        >
          {result}
        </h2>
      </div>

      {/* Play Again Button */}
      {result && (
        <button
          onClick={handleRefresh}
          className="bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default RockPaperScissors;
