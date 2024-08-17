"use client";

import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import Button from "../ui/Button";
import { MdDiscount } from "react-icons/md";

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
          <div className="flex items-center justify-between mt-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Subtotal
            </p>
            <p className="text-[1.8rem] font-bold">৳ 540.00</p>
          </div>
          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
          <div className="flex items-center justify-between mt-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Shipping
            </p>
            <p className="text-[1.8rem] font-bold">৳ 0.00</p>
          </div>

          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
          <div className="flex items-center justify-between mt-[2rem] mb-[4rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Total
            </p>
            <p className="text-[1.8rem] font-bold">৳ 540.00</p>
          </div>
          <Button type="auth" label="PROCEED TO CHECKOUT" />
          {/* Coupons section */}
          <div className="mt-[2rem]">
            <div className="flex items-center gap-x-4 ">
              <div className="text-[2.5rem] text-secondary-light">
                <MdDiscount />
              </div>
              <h2 className="text-[2rem] text-secondary-light font-medium">
                Coupon
              </h2>
            </div>
            <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
            <input
              className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[3rem] shadow-md mb-[2rem]"
              type="text"
              placeholder="Enter coupon code"
              //   onChange={(e) => setContact(e.target.value)}
            />
            <Button type="auth-transparent" label="Apply Coupon" />
          </div>
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