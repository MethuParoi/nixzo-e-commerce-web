"use client";

import Image from "next/image";
import React, { useState } from "react";
import img from "../../../public/images/categories/mens-1.jpg";
import SizeButtons from "./SizeButtons";
import Button from "../ui/Button";
import ReactImageMagnify from "react-image-magnify";

function ProductDetails() {
  return (
    <div className="flex items-start">
      <div className="flex gap-x-6">
        <div className="flex flex-col gap-y-2">
          <button className="border-2 border-gray-400 rounded-xl">
            <Image className="w-[5rem] rounded-xl" src={img} />
          </button>

          <button className="border-2 border-gray-400 rounded-xl">
            <Image className="w-[5rem] rounded-xl" src={img} />
          </button>

          <button className="border-2 border-gray-400 rounded-xl">
            <Image className="w-[5rem] rounded-xl" src={img} />
          </button>
        </div>
        <div className="w-[50rem] ">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "product image",
                isFluidWidth: true,
                src: img.src,
              },
              imageStyle: {
                objectFit: "fill",
                width: "100%",
                height: "100%",
              },
              largeImage: {
                src: img.src,
                width: 900,
                height: 1400,
              },
              enlargedImageContainerDimensions: {
                width: "300%",
                height: "300%",
              },
              enlargedImagePosition: "over",
              enlargedImageContainerStyle: {
                position: "absolute",
                background: "#fff",
                zIndex: 9999,
              },
            }}
          />
          {/* <Image className="w-[50rem] " src={img} /> */}
        </div>
      </div>
      <div className="ml-[3rem]">
        <h1 className="text-[2.4rem] text-secondary-light font-bold">
          Men&apos;s T-Shirt
        </h1>
        <p className="text-[3rem] text-secondary-dark font-semibold">
          <span className="text-[2.4rem] text-secondary-light mr-[.5rem]">
            ৳
          </span>{" "}
          999
        </p>
        <hr className="border-1 w-[60rem] my-[1rem]" />
        <p className="text-[1.8rem] text-secondary-light font-semibold">
          Color: Gray
        </p>
        <hr className="border-1 w-[60rem] my-[1rem]" />
        <div>
          <p className="text-[1.8rem] text-secondary-light font-semibold">
            Size:
          </p>
          <div className="my-[1rem] ">
            <SizeButtons />
          </div>
        </div>
        <div className="mt-[3rem]">
          <Button type="auth" label="Add to cart" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
