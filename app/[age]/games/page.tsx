import Image from "next/image";
import { gameCollection, GameCollection, Game } from "@/public/types/games";

export default async function Games({
  params
} : {
  params: Promise<{age: number}>
}) {
  const age = (await params).age.toString() == '3-5' ? 3 : 5

  // console.log(age)
  return (
    <>
      <div className="flex justify-center pt-5 pb-5">
        <div className="w-fit text-xl text-white bg-[#FD9764] p-5 pl-10 pr-10 rounded-[15px]">Choose a game</div>
      </div>

      <GameList data={gameCollection} age={age} />
    </>
  );
}

function GameList({ 
  data, age
} : {
  data: GameCollection, age: number
}) {
  const gameList = data.games.filter(game => game.age == age).map((game: Game) =>
    <GameItem key={game.name} name={game.name} iconUrl={game.icon} description={game.description} />
  )
  return(
    <div className="flex flex-col items-center">
      {gameList}
    </div>
  )
}

function GameItem({
  name, iconUrl, description
} : {
  name: string, iconUrl: string, description: string
}) {
  return(
    <div className="flex flex-row items-center bg-[#FFC6AA] w-[95%] mt-2 mb-2 p-2 rounded-[15px]">
      <div className="flex flex-col justify-center items-center aspect-square">
        <Image
          src={iconUrl}
          alt={name}
          width={70}
          height={70}
          style={{margin: '5px', aspectRatio: '1 / 1', width: '100px', borderRadius: '15px'}}
        />
        <div className="text-nowrap">{name}</div>
      </div>

      <div className="flex w-full justify-center">
        <div className="pl-5 pr-5 text-center">
          {description}
        </div>
      </div>
    </div>
  )
}

