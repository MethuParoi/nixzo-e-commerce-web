import React from "react";
import HotProductCard from "../ui/HotProductCard";
import SortOrder from "./SortOrder";
import OrderTable from "./OrderTable";

function AdminDashboard() {
  return (
    <div className="mt-[4rem]">
      {/* card section */}
      <div className="flex items-center justify-around ">
        <HotProductCard label={"Total Sales"} number={"৳ 3342"} Id={1} />
        <HotProductCard label={"Total Orders"} number={1234} Id={2} />
        <HotProductCard label={"Total Customers"} number={567} Id={3} />
        <HotProductCard label={"Total Revenue"} number={"৳ 8901"} Id={4} />
      </div>

      {/* order table section */}
      <div>
        <div className="flex items-center gap-x-3 mt-[4rem] relative">
          <h1 className="text-[2.5rem] font-semibold text-gray-700 ">
            Recent Orders
          </h1>
          <div className="absolute top-[-1.5rem] left-[20rem]">
            <SortOrder />
          </div>
        </div>
        <div className="mt-[2rem] grid grid-cols-5 w-[100rem] gap-4 justify-items-center">
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">
              Order Date
            </h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">
              Order ID
            </h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">
              Customer
            </h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">Total</h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">Status</h1>
          </div>
        </div>
        <div>
          <OrderTable
            order_id={52355}
            order_date={"26 aug"}
            customer={"Methu Paroi"}
            total={244}
            status={"Pending"}
          />
          <OrderTable
            order_id={52355}
            order_date={"26 aug"}
            customer={"Methu Paroi"}
            total={244}
            status={"Pending"}
          />
          <OrderTable
            order_id={52355}
            order_date={"26 aug"}
            customer={"Methu Paroi"}
            total={244}
            status={"Pending"}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
