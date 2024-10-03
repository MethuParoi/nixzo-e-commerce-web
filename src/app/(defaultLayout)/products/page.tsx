"use client";

import React from "react";
import Image from "next/image";
import ProductsRow from "@/components/products/ProductsRow";
import img from "../../../../public/images/products/product-banner.jpeg";
import SortRows from "@/components/products/SortRows";
import ProductLayout from "./layout";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import ErrorBoundary from "./error";
// lg:w-[100rem] xl:w-[120rem] 2xl:w-[150rem]
function ProductsPage() {
  return (
    <ErrorBoundary>
      <ProductLayout>
        <Provider store={store}>
          <div>
            <div className="py-[1rem]">
              <Image
                className="w-[100%] h-[20rem] md:h-[40rem] object-fill md:object-fill 2xl:object-cover"
                src={img}
                alt=""
              />
              <div className="mt-[1rem] flex items-centerjustify-between relative">
                <h1 className="text-[1.6rem] lg:text-[2rem] font-semibold pl-[2rem] mt-[1.2rem]">
                  All products
                </h1>

                <div className="absolute right-1 top-[-1rem] z-20 xl:hidden">
                  <SortRows />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5  mt-[4rem] mb-[8rem]">
              <div className="hidden xl:block xl:w-[22rem] 2xl:w-[26rem]">
                <div className="border-b-2 border-gray-300 mr-[2rem] py-[.5rem]">
                  <h1 className="text-[1.8rem] font-semibold">Filter items</h1>
                </div>

                <SortRows />
              </div>
              <div className="col-span-5 xl:col-span-4 xl:mr-[5rem]">
                <ProductsRow />
              </div>
            </div>
          </div>
        </Provider>
      </ProductLayout>
    </ErrorBoundary>
  );
}

export default ProductsPage;
