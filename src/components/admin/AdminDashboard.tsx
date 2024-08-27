import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React, { use, useEffect, useState } from "react";
import HotProductCard from "../ui/HotProductCard";
import SortOrder from "./SortOrder";
import OrderTable from "./OrderTable";
import { getOrders } from "../../../utils/placeOrder";

function AdminDashboard() {
  const [orderData, setOrderData] = useState([]);
  const [extractedItems, setExtractedItems] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const allOrders = await getOrders();
      setOrderData(allOrders);
    }

    fetchOrders();
  }, []);

  //---------------------------

  useEffect(() => {
    async function fetchOrders() {
      const allOrders = await getOrders();
      setOrderData(allOrders);
    }

    fetchOrders();
    // Set up real-time subscription
    const ordersChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order_table" },
        (payload) => {
          console.log("Received event", payload);
          setOrderData((prevOrders) => [...prevOrders, payload.new]);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(ordersChannel);
    };
  }, []);

  // Extract required fields from ordered_items
  useEffect(() => {
    const allExtractedItems = orderData.flatMap((order) => {
      if (order.ordered_items) {
        const items = JSON.parse(order.ordered_items);
        return items.map((item) => ({
          order_id: order.id,
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }));
      }
      return [];
    });
    setExtractedItems(allExtractedItems);
  }, [orderData]);

  //   console.log("extractd data:", extractedItems);

  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  //--------------------------

  //   useEffect(() => {
  //     console.log(orderData); // Log orderData whenever it changes
  //   }, [orderData]);

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
        <div className="mt-[2rem] grid grid-cols-6 w-full gap-4 justify-items-center">
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
              Customer Name
            </h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">
              Total Price
            </h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">
              Phone No.
            </h1>
          </div>
          <div>
            <h1 className="text-[2rem] font-semibold text-gray-500">Status</h1>
          </div>
        </div>
        <div className="h-[70dvh] overflow-y-scroll">
          {orderData
            .slice()
            .reverse()
            .map((order, index) => (
              <OrderTable
                key={index}
                order_id={order.id}
                order_date={formatDate(order.created_at)}
                first_name={order.first_name}
                last_name={order.last_name}
                total={order.total_price}
                phone={order.mobile_number}
                status={"Pending"}
                district={order.district}
                town_city={order.town_city}
                street_address={order.street_address}
                // extractedItems={extractedItems}
                extractedItems={extractedItems.filter(
                  (item) => item.order_id === order.id
                )}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
