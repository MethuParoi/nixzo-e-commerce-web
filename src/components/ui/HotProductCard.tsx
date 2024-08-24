import React from "react";
import { FaRegUser } from "react-icons/fa";
import { GiCash, GiShoppingCart, GiReceiveMoney } from "react-icons/gi";

function HotProductCard({ label, number, Id }) {
  return (
    <div>
      <div className="flex items-center justify-center w-[30rem] h-[12rem] bg-gray-200 rounded-lg shadow-xl p-[1rem]">
        <div className="w-[18rem] h-[12rem] flex items-center justify-center">
          <div>
            <p className="text-gray-500 text-[2rem] font-semibold">{label}</p>
            <h1 className="text-blue-500 text-[3rem] font-semibold">
              {number}
            </h1>
          </div>
        </div>
        <div className="w-[12rem] h-[12rem] flex items-center justify-center">
          <div className="flex items-center justify-center w-[10rem] h-[10rem] text-[6rem] bg-blue-400 rounded-[50%]">
            {Id === 1 && <GiCash className="text-white" />}
            {Id === 2 && <GiShoppingCart className="text-white" />}
            {Id === 3 && <FaRegUser className="text-white" />}
            {Id === 4 && <GiReceiveMoney className="text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotProductCard;
