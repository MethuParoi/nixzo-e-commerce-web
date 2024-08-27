"use client";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import React, { useEffect, useState } from "react";
import ProductsForm from "../../../../components/admin/ProductsForm";
import { getProducts } from "../../../../../utils/showProducts";
import ProductsTable from "../../../../components/admin/ProductsTable";
import Button from "@/components/ui/Button";

function Page() {
  const [modal, setModal] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getProducts();
      setProductData(allProducts);
    }

    fetchProducts();
  }, []);
  // console.log(productData);

  //---------------------------

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getProducts();
      setProductData(allProducts);
    }

    fetchProducts();
    // Set up real-time subscription
    const productsChannel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products_table" },
        (payload) => {
          console.log("Received event", payload);
          setProductData((prevProducts) => [...prevProducts, payload.new]);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(productsChannel);
    };
  }, []);

  const modalHandler = () => {
    setModal(!modal);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center container mx-auto relative ">
      {/* table header */}
      <div className="grid grid-cols-5 w-full gap-x-4 gap-y-2 justify-items-center bg-gray-200 py-[1rem] rounded-2xl mb-[2rem]">
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900">Image</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900">Product Name</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900">Category</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900">Price</h1>
        </div>
        <div>
          <h1 className="text-[2rem] font-bold text-gray-900">Rating</h1>
        </div>
      </div>
      <div
        className={`${
          modal
            ? "opacity-50"
            : "bg-gray-100 w-full px-[2rem] max-h-[80vh] overflow-y-auto"
        } flex flex-col items-center rounded-2xl`}
      >
        <ProductsTable productData={productData} />
      </div>
      <div className="self-start mt-[2rem]">
        <Button label="Add Product" onClick={() => modalHandler()} />
      </div>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ProductsForm modalHandler={modalHandler} />
        </div>
      )}
    </div>
  );
}

export default Page;
