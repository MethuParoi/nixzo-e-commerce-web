import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "../../../public/images/categories/classic-2.jpg";
import QuantityButton from "../ui/QuantityButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  getCurrentQuantityById,
  updateItemSize,
} from "@/store/features/cart/cartSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import SizeButtons from "../product-details/SizeButtons";

function CartItems({ item }) {
  const {
    productId,
    title,
    quantity,
    unitPrice,
    totalPrice,
    img,
    description,
    size,
  } = item;
  console.log("productID", productId);

  //using redux store
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(productId));
  // console.log("Current Quantity in Cart:", currentQuantity);
  // console.log("ID:", productId);

  // Local state to track the current selected size
  const [selectedSize, setSelectedSize] = useState(size);

  // Update the Redux store when the size is changed
  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    dispatch(updateItemSize({ productId, size: newSize }));
  };

  useEffect(() => {
    setSelectedSize(size); // Initialize size when component mounts or item changes
  }, [size]);

  return (
    <div className="flex justify-center md:grid xl:grid-cols-7 md:grid-cols-5 my-[1rem]">
      <div className="xl:col-span-4 col-span-2 flex xl:flex-row flex-col">
        <div className="border-2 border-gray-300 rounded-lg w-[15rem]">
          <Image
            className="w-[15rem] h-[15rem] rounded-lg"
            src={img}
            height={150}
            width={150}
            alt=""
          />
        </div>
        <div className="xl:ml-[2rem] mt-[1rem] xl:mt-0 h-[15rem]">
          <p className="md:text-[2rem] font-normal line-clamp-1 pr-4">
            {title}
          </p>
          {/* <p className="text-[1.6rem] mt-[1rem] text-secondary-light">
            Size: XL
          </p> */}
          <div className="mt-[2rem]">
            <SizeButtons
              selectedSize={selectedSize}
              setSelectedSize={(newSize) => handleSizeChange(newSize)}
            />
          </div>
        </div>
      </div>
      {/* lagrger than md */}
      <div className="hidden md:block">
        <p className="text-[2rem] font-medium">
          {" "}
          <span className="font-bold">৳</span>
          {unitPrice}
        </p>
      </div>
      <div className="hidden md:block">
        <QuantityButton
          currentQuantity={currentQuantity}
          productId={productId}
        />
      </div>
      <div className="md:flex items-start justify-between mr-[1rem] hidden ">
        <p className="text-[2rem] font-medium">
          {" "}
          <span className="font-bold">৳</span>{" "}
          {Math.round(unitPrice * currentQuantity)}
        </p>
        <button
          onClick={() => dispatch(deleteItem(productId))}
          className="text-[2.5rem] text-primary-light w-[3.5rem] h-[3.5rem] rounded-lg hover:bg-red-600 bg-red-500 flex justify-center items-center mb-[.5rem]"
        >
          <RiDeleteBin6Fill />
        </button>
      </div>

      {/* for mobile screen */}
      <div className="ml-[-16rem] md:hidden flex flex-col items-start  gap-y-8">
        <div className="">
          <p className="text-[2rem] font-medium">
            {" "}
            <span className="font-bold">৳</span>
            {unitPrice}
          </p>
        </div>
        <div className="flex gap-x-4">
          <div className="">
            <QuantityButton
              currentQuantity={currentQuantity}
              productId={productId}
            />
          </div>
          <div className="flex items-start justify-between mr-[1rem]">
            {/* <p className="hidden text-[2rem] font-medium">
            {" "}
            <span className="font-bold">৳</span>{" "}
            {Math.round(unitPrice * currentQuantity)}
          </p> */}
            <button
              onClick={() => dispatch(deleteItem(productId))}
              className="text-[2.5rem] text-primary-light w-[3.5rem] h-[3.5rem] rounded-lg hover:bg-red-600 bg-red-500 flex justify-center items-center mb-[.5rem]"
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;


