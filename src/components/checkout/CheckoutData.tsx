"use client";

import React from "react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

function CheckoutData() {
  const subtotal = useSelector((state) => state.checkout.subtotal);
  const total = useSelector((state) => state.checkout.total);

  return (
    <div className="mt-[8rem]">
      <div className="border-l-[.3rem] border-l-gray-400 pl-[4rem]">
        <div className="flex items-center justify-start">
          <h2 className="text-[2rem] font-medium">CART TOTALS</h2>
        </div>
        <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-400 mt-2" />
        <div className="flex items-center justify-between mt-[2rem]">
          <p className="text-[1.8rem] text-secondary-light font-medium">
            Subtotal
          </p>
          <p className="text-[1.8rem] font-bold">৳ {subtotal}</p>
        </div>
        <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
        <div className="flex items-center justify-between mt-[2rem]">
          <p className="text-[1.8rem] text-secondary-light font-medium">
            Shipping
          </p>
          {/* shipping cost to be updated */}
          <p className="text-[1.8rem] font-bold">৳ 00</p>
        </div>

        <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
        <div className="flex items-center justify-between mt-[2rem] mb-[2rem]">
          <p className="text-[1.8rem] text-secondary-light font-medium">
            Total
          </p>
          <p className="text-[1.8rem] font-bold">৳ {total}</p>
        </div>

        <Button
          onClick={() => {
            console.log("clicked");
          }}
          type="auth"
          label="PROCEED TO CHECKOUT"
        />
      </div>
    </div>
  );
}

export default CheckoutData;
