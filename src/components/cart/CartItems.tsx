import Image from "next/image";
import React from "react";
import img from "../../../public/images/categories/classic-2.jpg";
import QuantityButton from "../ui/QuantityButton";

function CartItems() {
  return (
    <div className="grid grid-cols-7 my-[1rem]">
      <div className="col-span-4 flex ">
        <div className="border-2 border-gray-300 rounded-lg">
          <Image
            className="w-[15rem] h-[15rem] rounded-lg"
            src={img}
            height={150}
            width={150}
          />
        </div>
        <div className="ml-[2rem] h-[15rem]">
          <p className="text-[2rem] font-normal line-clamp-1 pr-4">
            Men&apos;s stylish full suit with textured blazer and trouser
          </p>
          <p className="text-[1.6rem] mt-[1rem] text-secondary-light">
            Size: XL
          </p>
        </div>
      </div>
      <div>
        <p className="text-[2rem] font-medium">
          {" "}
          <span className="font-bold">৳</span> 540.00
        </p>
      </div>
      <div>
        <QuantityButton />
      </div>
      <div>
        <p className="text-[2rem] font-medium">
          {" "}
          <span className="font-bold">৳</span> 540.00
        </p>
      </div>
    </div>
  );
}

export default CartItems;
