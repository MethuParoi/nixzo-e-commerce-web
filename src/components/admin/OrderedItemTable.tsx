import React from "react";

function OrderedItemTable({ title, id, quantity, unitPrice }) {
  return (
    <div>
      <div className="mt-[2rem] grid grid-cols-4 w-full gap-4 justify-items-center">
        <div>
          <h1 className=" text-center font-medium text-gray-900">{title}</h1>
        </div>
        <div>
          <h1 className=" font-medium text-gray-900">{id}</h1>
        </div>
        <div>
          <h1 className=" font-medium text-gray-900">{quantity}</h1>
        </div>
        <div>
          <h1 className=" font-medium text-gray-900">{unitPrice}</h1>
        </div>
      </div>
    </div>
  );
}

export default OrderedItemTable;
