import Image from "next/image";
import React from "react";
import img from "../../../public/images/categories/classic-2.jpg";
import Button from "../ui/Button";
import { IoStar } from "react-icons/io5";

function ProductCard() {
  return (
    <div className="w-[30rem]">
      <div>
        <Image className="w-[30rem] h-[40rem] object-cover" src={img} alt="" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[2rem] font-semibold text-gray-600 line-clamp-1">
            Men's casual blazer
          </h1>
          {/* Rating section */}
          <div className="flex items-center justify-center gap-x-2 bg-green-400 w-[6rem] h-[2.6rem] text-gray-50">
            <div>
              <IoStar className="text-[2rem] " />
            </div>
            <p className="font-semibold ">4.5</p>
          </div>
        </div>
        <p className="text-gray-600 line-clamp-1">
          Mens black casual blazer with graphical printing
        </p>
        {/* add to cart */}
        <div className="flex items-center justify-between mt-4 mr-4">
          <Button type="card" label="Add to cart" />
          <p className="text-[3rem] text-gray-900 font-semibold">৳ 599</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
