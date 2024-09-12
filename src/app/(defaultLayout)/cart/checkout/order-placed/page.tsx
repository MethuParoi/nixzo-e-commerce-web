"use client";
import Link from "next/link";
import React from "react";

function OrderConfirmationPage() {
  return (
    <div className=" flex items-center justify-center min-h-[30rem]">
      <div className="flex flex-col items-center">
        <h1 className="text-[2.5rem] sm:text-[3.5rem] text-green-500 font-semibold text-center">
          Order Placed Succesfully!!!
        </h1>
        <p className="text-[1.2rem] sm:text-[1.6rem] mt-4 text-center">
          Your order has been placed successfully. You will receive an
          confirmation call shortly.
        </p>
        <Link
          href="/"
          className="mt-8 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
