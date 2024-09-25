import React, { useState } from "react";
import OrderedItemTable from "./OrderedItemTable";

function OrderTable({
  order_id,
  order_date,
  first_name,
  last_name,
  total: discounted_price,
  without_discount_total,
  shipping_cost,
  total_price_with_shipping,
  account_number,
  transaction_id,
  phone,
  email,
  district,
  town_city,
  street_address,
  zip_code,
  extractedItems,
  payment_method,
}) {
  const [view, setView] = useState(false);
  console.log("extractd data:", extractedItems);
  return (
    <div className="min-w-[100rem] xl:w-full  bg-gray-200 py-[1rem] rounded-xl my-[1rem]">
      <div
        onClick={() => setView(!view)}
        className="min-w-[100rem] grid grid-cols-6 lg:w-full gap-x-4 gap-y-2 justify-items-center  cursor-pointer"
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
          <h1 className="text-[2rem] font-medium, text-gray-700">
            {total_price_with_shipping}
          </h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">{phone}</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-medium, text-gray-700">
            {payment_method}
          </h1>
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
              {extractedItems.map((item, index) => (
                <OrderedItemTable
                  key={index}
                  title={item.title}
                  id={item.productId}
                  quantity={item.quantity}
                  unitPrice={item.unitPrice}
                />
              ))}
            </div>
          </div>
          {/* third row */}
          <div className="mt-[1rem] pt-[1rem] border-t-2 border-t-gray-500 grid grid-cols-4 grid-rows-2 w-full gap-x-4 gap-y-2 justify-items-center ">
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
                City/Upazila:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {town_city}
              </h1>
            </div>

            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Zip Code:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {zip_code}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Email:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {email}
              </h1>
            </div>
            <div className="col-span-2 justify-self-start ml-[11rem] flex gap-x-4 justify-start items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Street Address:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {street_address}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Account number:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {account_number}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Transaction id:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {transaction_id}
              </h1>
            </div>
          </div>
          {/* fourth row */}
          <div className="mt-[1rem] pt-[1rem] border-t-2 border-t-gray-500 grid grid-cols-4 w-full gap-x-4 gap-y-2 justify-items-center ">
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                without discount:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {without_discount_total}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Discounted price:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {discounted_price}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Shipping cost:
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {shipping_cost}
              </h1>
            </div>
            <div className="flex gap-x-4 justify-center items-center">
              <h1 className="text-[2rem] font-semibold, text-gray-700">
                Total price(+shipping):
              </h1>
              <h1 className="text-[2rem] font-medium, text-gray-700">
                {total_price_with_shipping}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTable;
