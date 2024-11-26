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
  const [gameOver, setGameOver] = useState(false)

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
      setMyScore(myScore + 1);
    }else if(user === computer) {
      setMyScore(prevScore => prevScore )
      setCompScore(prevScore => prevScore )
    } 
    else {
      setCompScore(compScore + 1);
    }
    if(myScore >= 10 && compScore <= 10) {
      setResult("Congratulations You Won!")
      setGameOver(true)
    }else if(myScore <= 10 && compScore >= 10) {
      setResult("You Loss!")
      setGameOver(true)
    } else if(myScore === 10 && compScore === 10) {
      setResult("Its a Draw")
    }
  };

  const handleRefresh = () => {
    setMyScore(0);
    setCompScore(0);
    setResult("");
    setUserSelection("");
    setComputerSelection("");
    setGameOver(false)
  };

  return (
    <div className="bg-gray-800 text-white h-[100vh] ">
      <div className="w-full bg-slate-600 text-white flex justify-between items-center py-4 px-8 mb-10">
        <div>
          <h1 className="text-[20px] uppercase">Rock Paper Scissors Game</h1>
        </div>
        <div>
          <Score lable="Your Score" score={myScore} />
          <Score lable="Computer Score" score={compScore} />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col ">
        <div className="mb-10">
          {choices.map((choice) => (
            <button
              className="m-4"
              key={choice.name}
              onClick={() => playGame(choice)}
              disabled={gameOver}
            >
              <img
                src={choice.image}
                alt={choice.name}
                className="w-[180px] hover:scale-110 hover:shadow  h-[180px] rounded-full object-cover "
              />
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-[25px] mb-10 uppercase">The Wining Score is <b>10</b></h2>
          <Choice label="Your Choice" choice={userSelection.name} />
          <Choice label="Computer Choice" choice={computerSelection.name} />
            <h2 className={`text-[20px] mt-10 ${
              result === "Congratulations You Won!" ? "text-green-500" : "text-red-500"
            }`}>{result}</h2>
          <div className="flex justify-center items-center flex-col">
            {result && (
              <button
              className="fixed bottom-14 bg-white py-2 px-4 rounded-md text-black"
              onClick={handleRefresh}
              >
                Play Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
