import Image from "next/image";
import { Category, imageCollection, ImageCollection } from "@/public/types/categories";

export default function Jigsaw() {
  return (
    <>
      <div className="flex justify-center pt-5 pb-5">
        <div className="w-fit text-xl text-white bg-[#FD9764] p-5 pl-10 pr-10 rounded-[15px]">MY PUZZLES</div>
      </div>
      
      <Categories data={imageCollection} />
    </>
  );
}

function Categories({
  data
} : {
  data: ImageCollection
}) {
  const categoryList = data.categories.map((category: Category) => 
    <CategoryItem key={category.categoryName} name={category.categoryName} imageUrl={category.assets[0].url} />
  )
  return(
    <div className="flex flex-row flex-wrap justify-center p-5 ">
      {categoryList}

      <div className="flex flex-col w-fit text-center p-2">
        <div className="w-[200px] h-[200px] border-[#f8d0b8] rounded-[15px] border-[5px]"></div>
        <div>Add your own image</div>
        <div className="flex absolute w-[200px] h-[200px] border-[#f8d0b8] rounded-[15px] border-[5px] bg-[#ffede2b9] justify-center items-center">
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
    <div className="flex flex-col w-fit text-center p-2">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        style={{border: '#f8d0b8 solid 5px', borderRadius: '15px'}}
      />
      <div>{name}</div>
    </div>
  )
}

