"use client";

import React from "react";
import Image from "next/image";
import ProductsRow from "@/components/products/ProductsRow";
import img from "../../../../public/images/products/product-banner.jpeg";
import SortRows from "@/components/products/SortRows";
import ProductLayout from "./layout";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

function ProductsPage() {
  return (
    <ProductLayout>
      <Provider store={store}>
        <div>
          <div className="py-[1rem]">
            <Image className="w-[100%] h-[40rem] object-cover" src={img} />
            <h1 className="mt-[1rem] text-[2rem] font-semibold pl-[2rem]">
              All products
            </h1>
          </div>

          <div className="grid grid-cols-5 mt-[4rem] mb-[8rem]">
            <div className="">
              <div className="border-b-2 border-gray-300 mr-[2rem] py-[.5rem]">
                <h1 className="text-[1.8rem] font-semibold">Filter items</h1>
              </div>

              <SortRows />
            </div>
            <div className="col-span-4 mr-[10rem]">
              <ProductsRow />
            </div>
          </div>
        </div>
      </Provider>
    </ProductLayout>
  );
}

export default ProductsPage;
