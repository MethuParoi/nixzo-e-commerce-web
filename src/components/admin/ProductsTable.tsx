"use client";

import React from "react";
import Image from "next/image";

function ProductsTable({ productData }) {
  return (
    <div className=" py-[.5rem] rounded-xl">
      {/* row data */}
      {productData
        .slice()
        .reverse()
        .map((product) => (
          <div
            key={product.product_id}
            className="grid grid-cols-5 w-full gap-x-4 gap-y-2 justify-items-center cursor-pointer bg-gray-200 my-[2rem] py-[1rem] rounded-2xl"
          >
            <div className="row-span-2 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.productTitle}
                width={100}
                height={100}
              />
            </div>
            <div>
              <h1 className="text-[2rem] font-medium text-gray-700">
                {product.productTitle}
              </h1>
            </div>
            <div>
              <h1 className="text-[2rem] font-medium text-gray-700">
                {product.productCategory || "N/A"}
              </h1>
            </div>
            <div>
              <h1 className="text-[2rem] font-medium text-gray-700">
                ${product.regularPrice}
              </h1>
            </div>
            <div>
              <h1 className="text-[2rem] font-medium text-gray-700">
                {product.rating}
              </h1>
            </div>

            <div className="col-start-2 col-end-6 grid-cols-4 place-self-start border-t-2 border-t-gray-300 w-full">
              <h1 className="text-[2rem] font-medium text-gray-700 mt-[.8rem]">
                <span className="font-bold text-gray-900">description:</span>{" "}
                {product.description || "N/A"}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ProductsTable;
