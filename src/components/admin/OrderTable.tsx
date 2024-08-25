import React, { useState } from "react";
import OrderedItemTable from "./OrderedItemTable";

function OrderTable({
  order_id,
  order_date,
  first_name,
  last_name,
  total,
  phone,
  district,
  town_city,
  street_address,
  extractedItems,
  status,
}) {
  const [view, setView] = useState(false);
  console.log("extractd data:", extractedItems);
  return (
    <div className="bg-gray-200  py-[1rem] rounded-xl my-[1rem]">
      <div
        onClick={() => setView(!view)}
        className=" grid grid-cols-6 w-full gap-x-4 gap-y-2 justify-items-center  cursor-pointer"
      >
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">
            {order_date}
          </h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">{order_id}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">
            {first_name} {last_name}
          </h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">{total}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">{phone}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">{status}</h1>
        </div>
      </div>

      {/* detailed view */}
      {view && (
        <div className="">
          {/* table view / second row */}
          <div>
            {/* second row header */}
            <div className="mt-[1rem] pt-[1rem] grid grid-cols-4 w-full gap-4 justify-items-center border-t-2 border-t-gray-500">
              <div>
                <h1 className="text-[1.8rem] font-semibold text-gray-700">
                  Product Name
                </h1>
              </div>
              <div>
                <h1 className="text-[1.8rem] font-semibold text-gray-700">
                  Product Id
                </h1>
              </div>
              <div>
                <h1 className="text-[1.8rem] font-semibold text-gray-700">
                  Ordered Quantity
                </h1>
              </div>
              <div>
                <h1 className="text-[1.8rem] font-semibold text-gray-700">
                  Unit Price
                </h1>
              </div>
            </div>
            <div>
              {extractedItems.map((item) => (
                <OrderedItemTable
                  title={item.title}
                  id={item.productId}
                  quantity={item.quantity}
                  unitPrice={item.unitPrice}
                />
              ))}
            </div>
          </div>
          {/* third row */}
          <div className="mt-[1rem] pt-[1rem] border-t-2 border-t-gray-500 grid grid-cols-4 w-full gap-x-4 gap-y-2 justify-items-center ">
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                District:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {district}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Town/City:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {town_city}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Street Address:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {street_address}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Street Address:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {street_address}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTable;
