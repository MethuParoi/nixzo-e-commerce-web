import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "@/store/features/cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

function QuantityButton({ productId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between border-gray-400 border-2 w-[10rem] h-[3.5rem]">
      <button
        onClick={() => dispatch(decreaseItemQuantity(productId))}
        className="bg-gray-200 border-r-2 border-r-gray-400 hover:bg-gray-300 w-[3rem] h-[3.1rem] flex items-center justify-center text-[2.2rem]"
      >
        -
      </button>
      <p className="text-[2rem] mx-2 py-1">{currentQuantity}</p>
      <button
        onClick={() => dispatch(increaseItemQuantity(productId))}
        className="bg-gray-200 hover:bg-gray-300 border-l-2 border-l-gray-400 w-[3rem] h-[3.1rem] flex items-center justify-center text-[2.2rem]"
      >
        +
      </button>
    </div>
  );
}

export default QuantityButton;
