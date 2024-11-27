import React from 'react'

const Choice = ({label, choice}) => {
  return (
    <div>
        <h2 className="text-[20px] uppercase">
            {label}: <b> {choice}</b>
          </h2>   
    </div>
  )
}

export default Choice
