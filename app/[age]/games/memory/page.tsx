'use client'
import Image from "next/image"

import { Levels, memoryLevels } from "@/public/types"
import { Dispatch, SetStateAction, useState } from "react"

export default function MemoryGame() {
  const [level, setLevel] = useState(0)

  return level == 0 ? <LevelsView setLevel={setLevel} /> : <GameView gameLevel={level} />
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

function GameView({
  gameLevel
} : {
  gameLevel: number
}) {
  const currentLevelData =  memoryLevels.levels.find((level) => level.level == gameLevel.toString())
  return(
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-around bg-[#FFC6AA] p-4">
        <span className="material-symbols-rounded" style={{ fontSize: '50px'}}>arrow_back</span>
        <div className="text-[30px] text-white bg-[#E79A74] w-[40%] text-center rounded-[10px]">5:00</div>
        <span className="material-symbols-rounded" style={{ fontSize: '50px'}}>cached</span>
      </div>

      <div className={`grid w-full h-full grid-cols-${generateAutoString(currentLevelData!.columns)} gap-y-[10px] gap-x-[10px] p-2`}>
        {Array.from({length: currentLevelData!.totalElements},(_,index) => <Card key={index} />)}
      </div>
    </div>
  )

  function generateAutoString(n: number): string {
    return `[${Array(n).fill("auto").join("_")}]`;
  }

  function Card() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div onClick={() => setIsFlipped(!isFlipped)} className="perspective-[1000px] cursor-pointer w-auto h-full">
        <div className={`flex h-full relative transform-3d transition-transform duration-[600ms] justify-center ${isFlipped ? "rotate-y-180" : ""}`}>
          <Image className="w-auto h-full absolute backface-hidden flex items-center justify-center rounded-2xl" style={{imageRendering: 'pixelated'}} quality={100} src={"/assets/memory/apple.png"} alt="apple.png" width={1000} height={0} />
          <Image className="w-auto h-full absolute backface-hidden flex items-center justify-center rotate-y-180 rounded-2xl" style={{imageRendering: 'pixelated'}} quality={100} src={"/assets/memory/card_back.png"} alt="back.png" width={1000} height={0} />
          {/* <div className="w-full h-full absolute backface-hidden flex items-center justify-center">Front</div>
          <div className="w-full h-full absolute backface-hidden flex items-center justify-center rotate-y-180">Back</div> */}
        </div>
      </div>
    )
  }
}