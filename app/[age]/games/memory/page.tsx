'use client'
import { Levels, memoryLevels } from "@/public/types/memoryLevelsData";
import { Dispatch, SetStateAction, useState } from "react"

export default function MemoryGame() {
  const [level, setLevel] = useState(0)

  return level == 0 ? <LevelsView setLevel={setLevel} /> : <GameView />
}

function LevelsView({
  setLevel
} : {
  setLevel: Dispatch<SetStateAction<number>>
}) {
  return(
    <div className="h-full w-full">
      <div className="flex w-full h-fit justify-center">
        <div className="h-fit bg-[#FD9764] p-2 w-[70%] text-center text-white rounded-[20px] text-[25px] mt-5 mb-5 drop-shadow-lg">
          MY LEVELS
        </div>
      </div>

      <div className="flex flex-row justify-evenly flex-wrap mt-2">
        {memoryLevels.levels.map((levels: Levels) => {
          return <Level key={levels.level} level={levels.level} />
        })}
      </div>
    </div>
  )

  function Level({
    level
  } : {
    level: string
  }) {
    return (
      <div onClick={() => setLevel(parseInt(level))} className="flex w-[150px] h-[150px] bg-white justify-center items-center m-2 rounded-[20px] text-[50px] drop-shadow-md">
        {level}
      </div>
    )
  }
}

function GameView() {
  return(
    <div>
      Memory Game View
    </div>
  )
}