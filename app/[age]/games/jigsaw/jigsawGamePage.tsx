import Script from "next/script";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"

export function JigsawGameView({
    category, setCategory, state, setState, pieceNumber
} : {
    category: string, state: number, pieceNumber: number
}) {
	const canvasRef = useRef(null);
	const [imageLoaded, setImageLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [initSeconds, setInitSeconds] = useState(3);
  
  const imageSrc = "/assets/jigsaw/animals/cat.jpg"

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('pieceNumber', pieceNumber);
    }
  })

	return (
		<div className="h-full w-full overflow-hidden bg-[#FFEDE2] select-none">
      <Image
        id="dragImage"
        src=""
        alt="drageImage"
        className="hidden absolute w-0 h-0 cursor-move pointer-events-none"
      />

      <div id="infoParent" className="hidden absolute w-[100%] justify-center items-center -z-10">
          <div className="flex w-[95%] h-[95%] justify-end">
              <div id="infoDisplay" className="flex flex-col items-center bg-[#FFC6AA] transition-all ease-in rounded-full border-[#FF7A37] border-[5px] w-[50px] h-[50px]">
                  <div id="infoDisplayHeader" className="font-bold text-[30px] p-2 transition-opacity duration-500 opacity-0">RULES</div>
                  <div id="infoDisplayContent" className="flex flex-col text-[25px] w-full transition-opacity duration-500 opacity-0">
                      <ol>
                          <li className="p-2">Find the edge pieces: Look for pieces with a straight side and make the border first.</li>
                          <li className="p-2">Sort by color: Put pieces with the same colors or patterns together.</li>
                          <li className="p-2">Try to match the shapes: Find pieces that fit together. Do not push too hard!</li>
                          <li className="p-2">Take your time: If you get stuck, take a break and try again. Have fun! </li>
                      </ol>
                  </div>
              </div>
          </div>
      </div>

			<div className="flex flex-col justify-between h-full w-full">
				<div className="h-fit w-full flex justify-around bg-[#FFC6AA] pt-5 pb-5">
					<span id="back_button" className="material-symbols-rounded text-[40px]">arrow_back</span>
					<span id="show_image" className="material-symbols-rounded text-[40px]">image</span>
          <Image id="edge" className="w-7" src={"/assets/edge-icon.svg"} alt="icon" width={100} height={100} />
					<span id="hint" className="material-symbols-rounded text-[40px]">emoji_objects</span>
					<span id="refresh" className="material-symbols-rounded text-[40px]">cached</span>
					<span id="info" className="material-symbols-rounded text-[40px] z-10">info</span>
				</div>

				<div className="flex items-center justify-center">
					<canvas ref={canvasRef} id="gameCanvas" className="aspect-square bg-[#FFBB98] w-[425px] max-sm:w-full"></canvas>
				</div>

				<div id="jigsaw_pieces" className="flex flex-row justify-between h-fit bg-[#EEB69A] items-center overflow-x-auto"></div>
			</div>

      {completed && 
        <div id="completionMenu" className="hidden absolute bg-[#ff7a373f] h-full w-full justify-center items-center top-0">
          <div className="flex h-3/4 w-[340px] bg-gradient-to-t from-[#FEB793] via-[#FFDDCC] to-[#FFFEFE] border-[5px] border-[#FF7A37] justify-between flex-col items-center">

            <div className="flex justify-center items-center p-5 w-full">
              <div className="flex justify-center items-center p-2 w-[80%] bg-[#FD9764] rounded-[5px] text-white text-[30px] drop-shadow-xl">Completed</div>
            </div>

            <div className="flex justify-center items-center">
              <Image
                id="completionImg"
                src={imageSrc}
                alt="completionImage"
                width={1000}
                height={1000}
                className="aspect-square w-[80%] rounded-[5px] border-[#f8d0b8] border-[5px]"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex justify-evenly items-center p-2 bg-[#F4B494] w-fit rounded-[50px] drop-shadow-md">
                <span className="material-symbols-rounded p-2 pl-5 text-[30px]">alarm</span>
                <div id="timer" className="p-2 text-white font-bold text-[20px] pr-5"></div>
              </div>
            </div>

            <div className="flex items-center justify-evenly p-5 w-full">
              <span id="home" className="material-symbols-rounded text-[30px] rounded-[50px] bg-[#ff480075] p-2">home</span>
              <span id="gameRefresh" className="material-symbols-rounded text-[30px] rounded-[50px] bg-[#ff480075] p-2">cached</span>
              <span id="nextImage" className="material-symbols-rounded text-[30px] rounded-[50px] bg-[#ff480075] p-2">play_arrow</span>
            </div>

          </div>
        </div>
      }

      <Script src="/script.js" />

		</div>
	)

  

}