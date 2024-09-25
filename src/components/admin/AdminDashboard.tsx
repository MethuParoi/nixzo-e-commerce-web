import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React, { use, useEffect, useState } from "react";
import HotProductCard from "../ui/HotProductCard";
import OrderTable from "./OrderTable";
import { getOrders } from "../../../utils/placeOrder";
import { IoIosArrowDropdown } from "react-icons/io";

function AdminDashboard() {
  const [orderData, setOrderData] = useState([]);
  const [extractedItems, setExtractedItems] = useState([]);

  //sorting function
  const [sortVisible, setSortVisible] = useState(false);
  const [sortType, setSortType] = useState("all");

  useEffect(() => {
    async function fetchOrders(sortType) {
      const allOrders = await getOrders(sortType);
      setOrderData(allOrders);
    }

    fetchOrders(sortType);
  }, [sortType]);

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

  return (
    <div className="mt-[4rem]">
      {/* card section */}
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-y-[2rem] md:gap-x-[10rem] ">
        <HotProductCard label={"Total Sales"} number={"৳ 3342"} Id={1} />
        <HotProductCard label={"Total Orders"} number={1234} Id={2} />
        {/* <HotProductCard label={"Total Customers"} number={567} Id={3} />
        <HotProductCard label={"Total Revenue"} number={"৳ 8901"} Id={4} /> */}
      </div>

      {/* order table section */}
      <div>
        <div className="flex items-center gap-x-3 mt-[4rem] relative">
          <h1 className="text-[2.5rem] font-semibold text-gray-700 ">
            Recent Orders
          </h1>
          <div className="absolute top-[-1.5rem] left-[20rem]">
            <div>
              <div className=" mr-[2rem] pt-[2rem]">
                {/* sorting function */}
                <button
                  className="text-secondary-dark font-semibold hover:text-secondary-light flex items-center gap-x-2 bg-gray-200 py-1 px-2 rounded-xl shadow-lg"
                  onClick={() => setSortVisible(!sortVisible)}
                >
                  Sort by time
                  <IoIosArrowDropdown className="text-[2rem]" />
                </button>
                {sortVisible && (
                  <div className="flex flex-col gap-y-3 items-start bg-gray-200 p-4 rounded-2xl shadow-xl mt-[1rem]">
                    <button
                      onClick={() => setSortType("day")}
                      className="text-secondary-dark font-semibold hover:text-secondary-light"
                    >
                      last 24hr
                    </button>
                    <button
                      onClick={() => setSortType("week")}
                      className="text-secondary-dark font-semibold hover:text-secondary-light"
                    >
                      last one week
                    </button>
                    <button
                      onClick={() => setSortType("month")}
                      className="text-secondary-dark font-semibold hover:text-secondary-light"
                    >
                      last one month
                    </button>
                    <button
                      onClick={() => setSortType("all")}
                      className="text-secondary-dark font-semibold hover:text-secondary-light"
                    >
                      all time
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[78dvw] overflow-x-scroll 2xl:overflow-x-hidden">
          <div className="min-w-[100rem] xl:w-[78dvw] mt-[2rem] grid grid-cols-6  gap-4 justify-items-center">
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
                Total Price(+Shipping)
              </h1>
            </div>
            <div>
              <h1 className="text-[2rem] font-semibold text-gray-500">
                Phone No.
              </h1>
            </div>
            <div>
              <h1 className="text-[2rem] font-semibold text-gray-500">
                Payment method
              </h1>
            </div>
          </div>
          <div className="h-[70dvh] min-w-[100rem] overflow-y-scroll mb-[5rem]">
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
                  without_discount_total={order.without_discount_price}
                  shipping_cost={order.shipping_cost}
                  total_price_with_shipping={order.total_price_with_shipping}
                  phone={order.mobile_number}
                  payment_method={order.payment_method}
                  account_number={order.account_number}
                  transaction_id={order.transaction_id}
                  district={order.district}
                  town_city={order.town_city}
                  street_address={order.street_address}
                  zip_code={order.zip_code}
                  email={order.email}
                  // extractedItems={extractedItems}
                  extractedItems={extractedItems.filter(
                    (item) => item.order_id === order.id
                  )}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
