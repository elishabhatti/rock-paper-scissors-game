import React from 'react'

const Score = ({lable, score}) => {
  return (
    <div>
        <h2>
            {lable}: <b>{score}</b>
          </h2>      
    </div>
  )
}

export default Score
