import React, { useEffect, useRef, useState } from "react";

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
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    if (time > 0) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer.current);
      setGameOver(true);
      determineWinner();
    }

    return () => clearInterval(timer.current);
  }, [time]);

  const playGame = (userSelect) => {
    if (time === 0) return;
      const randomIndex = Math.floor(Math.random() * choices.length);
      const computerSelect = choices[randomIndex];

      setUserSelection(userSelect);
      setComputerSelection(computerSelect);
      winner(userSelect.name, computerSelect.name);
  };
  const winner = (user, computer) => {
    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setMyScore(myScore + 1);
    } else {
      setCompScore(compScore + 1);
    }
  };

  const determineWinner = () => {
    if (myScore > compScore) {
      setResult("You are the Winner");
    } else if (myScore < compScore) {
      setResult("Computer is the Winner");
    } else {
      setResult("Its a Tie");
    }
  };

  const handleRefresh = () => {
    setMyScore(0);
    setCompScore(0);
    setResult("");
    setUserSelection("");
    setComputerSelection("");
    setTime(30);
    setGameOver(false);
  };

  return (
    <div className="bg-gray-800 text-white h-[100vh] ">
      <div className="w-full bg-slate-600 text-white flex justify-between items-center py-4 px-8 mb-10">
        <div>
          <h1 className="text-2xl uppercase">Rock Paper Scissors Game</h1>
        </div>
        <div></div>
        <div>
          <h2>
            User Score: <b> {myScore}</b>
          </h2>
          <h2>
            Computer Score: <b>{compScore}</b>
          </h2>
          <h2>
            Timer: <b>{time}</b>
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col ">
        <div className="mb-10">
          {choices.map((choice) => (
            <button
              className="m-4"
              key={choice}
              onClick={() => playGame(choice)}
              disabled={time === 0 || gameOver}
            >
              <img
                src={choice.image}
                alt={choice.name}
                className="w-40 h-40 rounded-full object-cover "
              />
            </button>
          ))}
        </div>
        <div>
          <h2 className="text-[20px] uppercase">
            Your Choice: <b>{userSelection.name}</b>
          </h2>
          <h2 className="text-[20px] uppercase">
            Computer Choice: <b>{computerSelection.name}</b>
          </h2>
          <h2 className="text-[20px] uppercase mt-10">
            {gameOver && (
              <p>
                Result:<b>{result}</b>
              </p>
            )}
          </h2>
          <div className="flex justify-center items-center flex-col">
            {result && gameOver && (
              <button
                className="fixed bottom-14  bg-white py-2 px-4 rounded-md text-black"
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
