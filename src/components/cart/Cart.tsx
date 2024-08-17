"use client";

import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";

class NotFoundError extends Error {}

function Cart() {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      window.location.reload();
      console.log("refresh done");
    }
  }, [error]);

  try {
    return (
      <div className="grid grid-cols-3 h-[60rem] xl:w-[120rem] 2xl:w-[150rem] my-[4rem]">
        <div className="col-span-2">
          <div className="grid grid-cols-7 text-[2rem] font-medium">
            <div className="col-span-4 ">PRODUCT</div>
            <div>PRICE</div>
            <div>QUANTITY</div>
            <div>SUBTOTAL</div>
            <hr className="lg:w-[96rem] h-1 border-0 rounded bg-gray-400 mt-2" />
          </div>
          {/* map function */}
          <CartItems />
        </div>

        <div className="border-l-[.3rem] border-l-gray-400 pl-[4rem]">
          <div className="flex items-center justify-start">
            <h2 className="text-[2rem] font-medium">CART TOTALS</h2>
          </div>
          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-400 mt-2" />
        </div>
      </div>
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      setError(true);
    } else {
      throw e;
    }
  }
}

export default Cart;
