import React from "react";

function OrderTable({ order_id, order_date, customer, total, status }) {
  return (
    <div className="">
      <div className="mt-[2rem] grid grid-cols-5 w-[100rem] gap-4 justify-items-center bg-gray-200  py-[1rem] rounded-xl">
        <div>
          <h1 className="text-[2rem] font-mediu, text-gray-700">
            {order_date}
          </h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-mediu, text-gray-700">{order_id}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-mediu, text-gray-700">{customer}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-mediu, text-gray-700">{total}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-mediu, text-gray-700">{status}</h1>
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
