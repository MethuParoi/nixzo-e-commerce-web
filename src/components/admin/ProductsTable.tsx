"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function ProductsTable({ productData, onEditProduct, onDeleteProduct }) {
  const [popupVisible, setPopupVisible] = useState(null);

  function togglePopup(productId) {
    setPopupVisible((prev) => (prev === productId ? null : productId));
  }

  return (
    <div className="py-[.5rem] rounded-xl w-full">
      {/* row data */}
      {productData
        .slice()
        .reverse()
        .map((product) => {
          const images = product.image ? product.image.split(",") : [];
          return (
            <div
              key={product.product_id}
              className="grid grid-cols-5 w-full gap-x-4 gap-y-2 justify-items-center cursor-pointer bg-gray-200 my-[2rem] py-[1rem] rounded-2xl relative"
            >
              <div className="row-span-2 flex items-center justify-center">
                {images.map((img, index) => (
                  <Image
                    className="rounded-md w-[8rem] h-[10rem] mx-[.5rem] border-2 border-gray-400"
                    key={index}
                    src={img}
                    alt={product.productTitle}
                    width={100}
                    height={100}
                  />
                ))}
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
              <div className="flex items-center gap-x-[4rem]">
                <h1 className="text-[2rem] font-medium text-gray-700 ">
                  {product.rating}
                </h1>
                <div
                  onClick={() => togglePopup(product.product_id)}
                  className="absolute top-3 right-4 cursor-pointer"
                >
                  <PiDotsThreeOutlineVerticalBold className="text-[2.5rem] text-gray-600" />
                  {popupVisible === product.product_id && (
                    <div className="absolute top-12 right-4 w-[10rem] bg-white shadow-md rounded-md z-10">
                      <ul>
                        <li
                          onClick={() => onEditProduct(product)}
                          className="p-2 cursor-pointer hover:bg-gray-200 flex items-center gap-x-3"
                        >
                          <MdModeEditOutline className="text-[2rem] text-gray-700" />
                          <p>Edit</p>
                        </li>
                        <li
                          onClick={() => onDeleteProduct(product.product_id)}
                          className="p-2 cursor-pointer hover:bg-gray-200 flex items-center gap-x-3"
                        >
                          <RiDeleteBin6Fill className="text-[2rem] text-gray-700" />
                          <p>Delete</p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-start-2 col-end-6 grid-cols-4 place-self-start border-t-2 border-t-gray-300 w-full">
                <h1 className="text-[2rem] font-medium text-gray-700 mt-[.8rem]">
                  <span className="font-bold text-gray-900">description:</span>{" "}
                  {product.description || "N/A"}
                </h1>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProductsTable;
