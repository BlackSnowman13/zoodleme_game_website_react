import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center pt-5 pb-5">
        <div className="w-fit text-xl text-white bg-[#FD9764] p-5 pl-10 pr-10 rounded-[15px] drop-shadow-xl ">CHOOSE AN AGE GROUP</div>
      </div>

      <div className="flex flex-row flex-wrap justify-center">
        <ChildCategory content={"3-5 years"} imageUrl={"/assets/ageCategory/Kids.png"} width={200} url={"/3-5/games"} />
        <ChildCategory content={"5-10 years"} imageUrl={"/assets/ageCategory/Boy.png"} width={120} url={"/5-10/games"} />
      </div>
    </>
  );
}

function ChildCategory({
  content, imageUrl, width, url
} : {
  content: string, imageUrl: string, width: number, url: string
}) {
    return(
      <Link href={url}>
        <div className="flex flex-col bg-[#FFC6AA] m-5 w-[350px] h-[250px] justify-evenly p-5 rounded-[15px] drop-shadow-xl active:bg-[#ffae86]">
            <div className="flex">
                <div className="w-fit bg-[#FD9764] p-2 rounded-[50px] text-[30px] text-white pl-5 pr-5">
                    {content}
                </div>
            </div>
            <div className="flex justify-end">
                <Image
                    src={imageUrl}
                    alt={content}
                    height={100}
                    width={width}
                />
            </div>
        </div>
      </Link>
    )
}