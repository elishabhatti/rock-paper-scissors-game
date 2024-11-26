import React, { useRef, useState } from "react";

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
  const [time, setTime] = useState(0)

  const playGame = (userSelect) => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerSelect = choices[randomIndex];

    setUserSelection(userSelect);
    setComputerSelection(computerSelect);
    winner(userSelect.name, computerSelect.name);
  };
  const winner = (user, computer) => {
    if (user === computer) {
      setResult("Is a Draw");
    } else if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      setResult("You Wins  🎉");
      setMyScore(myScore + 1);
    } else {
      setResult("Computer Wins 💻");
      setCompScore(compScore + 1);
    }
    // if (myScore >= 10 && compScore <= 10) {
    //   alert("You Won");
    //   handleRefresh();
    // } else if (myScore <= 10 && compScore >= 10) {
    //   alert("You Lose");
    //   handleRefresh();
    // }
  };

  const handleRefresh = () => {
    setMyScore(0);
    setCompScore(0);
    setResult("");
    setUserSelection("");
    setComputerSelection("");
  };

  return (
    <div className="bg-gray-800 text-white h-[100vh] ">
      <div className="w-full bg-slate-600 text-white flex justify-between items-center py-4 px-8 mb-10">
        <div>
          <h1 className="text-2xl uppercase">Rock Paper Scissors Game</h1>
        </div>
        <div>

        </div>
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
            Result: <b>{result}</b>
          </h2>
          <div className="flex justify-center items-center flex-col">
            {result && (
              <button
                className="fixed bottom-14  bg-white py-2 px-4 rounded-md text-black"
                onClick={handleRefresh}
              >
                Reset Score
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
