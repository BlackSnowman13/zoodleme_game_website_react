"use client"

import Image from "next/image";
import { Category, imageCollection, ImageCollection } from "@/public/types/categories";
import { useState } from "react";
import { JigsawGamePage } from "./jigsawGamePage";

export default function Jigsaw() {
  const [state, setState] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [pieceNumber, setPieceNumber] = useState(16);

  return state == 0 ? <CategoriesPage />: <JigsawGamePage category={selectedCategory} setCategory={setSelectedCategory} state={state} setState={setState} pieceNumber={pieceNumber} />;

  function CategoriesPage() {
    
    function onPieceSelection(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
      const { id } : { id: string} = event.target;
      setPieceNumber(parseInt(id.replace('piece_', '')))
    }

    return(
      <>
        <div>
          <div className="flex justify-center pt-5 pb-5">
            <div className="w-fit text-xl text-white bg-[#FD9764] p-5 pl-10 pr-10 rounded-[15px] drop-shadow-xl">MY PUZZLES</div>
          </div>
          
          <Categories data={imageCollection} />
        </div>

        {selectedCategory != '' && 
          <div className="flex absolute h-full w-full top-0 bg-[#ffe0d0be] z-1 justify-center items-center">
            <div className="flex h-3/4 w-[340px] bg-gradient-to-t from-[#FEB793] via-[#FFDDCC] to-[#FFFEFE] border-[5px] border-[#FF7A37] justify-between flex-col items-center">

              <div className="flex w-full h-fit justify-end z-10">
                <span onClick={() => setSelectedCategory('')} className="material-symbols-rounded text-[#C31A1A] p-1 text-[30px]">disabled_by_default</span>
              </div>

              <div className="flex h-full w-full flex-col justify-between items-center">
                <div className="bg-[#FFC6AA] w-fit flex text-center pl-7 pr-7 rounded-[20px] text-[22px] drop-shadow-xl">
                  Choose difficulty
                </div>

                <div className="flex justify-center items-center w-fit">
                  <Image
                  className="w-[80%] rounded-[5px] border-[5px] border-[#fadac6]"
                    src={imageCollection.categories.find(category => category.categoryName == selectedCategory)?.assets[0].url}
                    alt={imageCollection.categories.find(category => category.categoryName == selectedCategory)?.assets[0].name}
                    width={1000}
                    height={1000}
                  />
                </div>

                <div className="z-1 flex h-fit w-full bg-[#FFC6AA] flex-col drop-shadow-md">
                  <div className="flex justify-center p-2 text-[20px]">Number of pieces</div>
                  <div className="flex flex-row justify-evenly p-2 text-[20px]">
                    <div onClick={onPieceSelection} id="piece_4" className={`p-2 ${pieceNumber == 4 ? "bg-[#d3714b54] rounded-full": ""}`}>4</div>
                    <div onClick={onPieceSelection} id="piece_9" className={`p-2 ${pieceNumber == 9 ? "bg-[#d3714b54] rounded-full": ""}`}>9</div>
                    <div onClick={onPieceSelection} id="piece_16" className={`p-2 ${pieceNumber == 16 ? "bg-[#d3714b54] rounded-full": ""}`}>16</div>
                    <div onClick={onPieceSelection} id="piece_25" className={`p-2 ${pieceNumber == 25 ? "bg-[#d3714b54] rounded-full": ""}`}>25</div>
                  </div>
                </div>

                <div onClick={() => setState(1)} className="z-1 font-[30px] text-center p-2 bg-[#FD9764] w-[50%] rounded-[20px] m-5 text-white">Play</div>
              </div>

            </div>
          </div>
        }
      </>
    )

    function Categories({
      data
    } : {
      data: ImageCollection
    }) {
      const categoryList = data.categories.map((category: Category) => 
        <CategoryItem key={category.categoryName} name={category.categoryName} imageUrl={category.assets[0].url} />
      )
      return(
        <div className="flex flex-row flex-wrap justify-evenly p-2 ">
          {categoryList}
    
          <div className="flex flex-col w-fit text-center pt-2 pb-2">
            <div className="w-[170px] h-[170px] border-[#f8d0b8] rounded-[15px] border-[5px]"></div>
            <div>Add your own image</div>
            <div className="flex absolute w-[170px] h-[170px] border-[#f8d0b8] rounded-[15px] border-[5px] bg-[#ffede2b9] justify-center items-center">
              <span className="material-symbols-rounded text-[50px]">add_photo_alternate</span>
            </div>
          </div>
        </div>
      )      
    }

    function CategoryItem({
      name, imageUrl
    } : {
      name: string, imageUrl: string
    }) {
      return (
        <div onClick={() => setSelectedCategory(name)} className="flex flex-col w-fit text-center pt-2 pb-2">
          <Image
            src={imageUrl}
            alt={name}
            width={170}
            height={170}
            style={{border: '#f8d0b8 solid 5px', borderRadius: '15px'}}
          />
          <div>{name}</div>
        </div>
      )
    }
  }
}