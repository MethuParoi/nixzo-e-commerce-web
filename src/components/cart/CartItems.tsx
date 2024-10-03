import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "../../../public/images/categories/classic-2.jpg";
import QuantityButton from "../ui/QuantityButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  getCurrentQuantityById,
  updateItemSize,
} from "@/store/features/cart/cartSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import SizeButtons from "../product-details/SizeButtons";

function CartItems({ item }) {
  const {
    productId,
    title,
    quantity,
    unitPrice,
    totalPrice,
    img,
    description,
    size,
  } = item;
  console.log("productID", productId);

  //using redux store
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(productId));
  // console.log("Current Quantity in Cart:", currentQuantity);
  // console.log("ID:", productId);

  // Local state to track the current selected size
  const [selectedSize, setSelectedSize] = useState(size);

  // Update the Redux store when the size is changed
  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
    dispatch(updateItemSize({ productId, size: newSize }));
  };

  useEffect(() => {
    setSelectedSize(size); // Initialize size when component mounts or item changes
  }, [size]);

  return (
    <div className="flex justify-center md:grid xl:grid-cols-7 md:grid-cols-5 my-[1rem]">
      <div className="xl:col-span-4 col-span-2 flex xl:flex-row flex-col">
        <div className="border-2 border-gray-300 rounded-lg w-[15rem]">
          <Image
            className="w-[15rem] h-[15rem] rounded-lg"
            src={img}
            height={150}
            width={150}
            alt=""
          />
        </div>
        <div className="xl:ml-[2rem] mt-[1rem] xl:mt-0 h-[15rem]">
          <p className="md:text-[2rem] font-normal line-clamp-1 pr-4">
            {title}
          </p>
          {/* <p className="text-[1.6rem] mt-[1rem] text-secondary-light">
            Size: XL
          </p> */}
          <div className="mt-[2rem]">
            <SizeButtons
              selectedSize={selectedSize}
              setSelectedSize={(newSize) => handleSizeChange(newSize)}
            />
          </div>
        </div>
      </div>
      {/* lagrger than md */}
      <div className="hidden md:block">
        <p className="text-[2rem] font-medium">
          {" "}
          <span className="font-bold">৳</span>
          {unitPrice}
        </p>
      </div>
      <div className="hidden md:block">
        <QuantityButton
          currentQuantity={currentQuantity}
          productId={productId}
        />
      </div>
      <div className="md:flex items-start justify-between mr-[1rem] hidden ">
        <p className="text-[2rem] font-medium">
          {" "}
          <span className="font-bold">৳</span>{" "}
          {Math.round(unitPrice * currentQuantity)}
        </p>
        <button
          onClick={() => dispatch(deleteItem(productId))}
          className="text-[2.5rem] text-primary-light w-[3.5rem] h-[3.5rem] rounded-lg hover:bg-red-600 bg-red-500 flex justify-center items-center mb-[.5rem]"
        >
          <RiDeleteBin6Fill />
        </button>
      </div>

      {/* for mobile screen */}
      <div className="ml-[-16rem] md:hidden flex flex-col items-start  gap-y-8">
        <div className="">
          <p className="text-[2rem] font-medium">
            {" "}
            <span className="font-bold">৳</span>
            {unitPrice}
          </p>
        </div>
        <div className="flex gap-x-4">
          <div className="">
            <QuantityButton
              currentQuantity={currentQuantity}
              productId={productId}
            />
          </div>
          <div className="flex items-start justify-between mr-[1rem]">
            {/* <p className="hidden text-[2rem] font-medium">
            {" "}
            <span className="font-bold">৳</span>{" "}
            {Math.round(unitPrice * currentQuantity)}
          </p> */}
            <button
              onClick={() => dispatch(deleteItem(productId))}
              className="text-[2.5rem] text-primary-light w-[3.5rem] h-[3.5rem] rounded-lg hover:bg-red-600 bg-red-500 flex justify-center items-center mb-[.5rem]"
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;


//multiple image options

// Ensure img is not null or undefined and split it
  // const image = img ? img.split(",") : [];

  // const image1 = image[0];
  // const image2 = image[1];
  // const image3 = image[2];
  // const image4 = image[3];

  // const [displayImage, setDisplayImage] = useState(image1);

  // function handleDisplayImage(imageKey) {
  //   if (imageKey === "image1") {
  //     setDisplayImage(image1);
  //   }
  //   if (imageKey === "image2") {
  //     setDisplayImage(image2);
  //   }
  //   if (imageKey === "image3") {
  //     setDisplayImage(image3);
  //   }
  //   if (imageKey === "image4") {
  //     setDisplayImage(image4);
  //   }
  // }

  // <div>
  //   <div className="rounded-lg md:h-[16rem] h-[14rem] w-[14rem] md:w-[14rem] border-2 border-gray-400 shadow-lg flex items-center justify-center object-fill">
  //     {/* <img
  //               className="w-full h-full object-fill"
  //               src={displayImage}
  //               alt=""
  //             /> */}
  //     <ReactImageMagnify
  //       {...{
  //         smallImage: {
  //           alt: "product image",
  //           isFluidWidth: true,
  //           src: displayImage,
  //         },
  //         imageStyle: {
  //           objectFit: "fill",
  //           width: "100%",
  //           height: "100%",
  //         },
  //         largeImage: {
  //           src: displayImage,
  //           width: 1200,
  //           height: 800,
  //         },
  //         enlargedImageContainerDimensions: {
  //           width: "300%",
  //           height: "300%",
  //         },
  //         enlargedImagePosition: "beside",
  //         enlargedImageContainerStyle: {
  //           position: "absolute",
  //           background: "#fff",
  //           zIndex: 9999,
  //         },
  //       }}
  //     />
  //   </div>

  //   {/* photo options */}
  //   <div className="pt-4 flex items-center justify-center gap-x-1">
  //     {image1 && (
  //       <button className=" ">
  //         <img
  //           className="rounded-lg h-[2rem] w-[2rem] object-contain object-center border-2 border-gray-400 hover:border-primary hover:border-4 shadow-lg"
  //           src={image1}
  //           alt=""
  //           onClick={() => handleDisplayImage("image1")}
  //         />
  //       </button>
  //     )}
  //     {image2 && (
  //       <button className="pl-[1rem]">
  //         <img
  //           className="rounded-lg h-[2rem] w-[2rem] object-contain object-center border-2 border-gray-400 hover:border-primary hover:border-4 shadow-lg"
  //           src={image2}
  //           alt=""
  //           onClick={() => handleDisplayImage("image2")}
  //         />
  //       </button>
  //     )}
  //     {image3 && (
  //       <button className="pl-[1rem]">
  //         <img
  //           className="rounded-lg h-[2rem] w-[2rem] object-contain object-center border-2 border-gray-400 hover:border-primary hover:border-4 shadow-lg"
  //           src={image3}
  //           alt=""
  //           onClick={() => handleDisplayImage("image3")}
  //         />
  //       </button>
  //     )}
  //     {image4 && (
  //       <button className="pl-[1rem]">
  //         <img
  //           className="rounded-lg h-[2rem] w-[2rem] object-contain object-center border-2 border-gray-400 hover:border-primary hover:border-4 shadow-lg"
  //           src={image4}
  //           alt=""
  //           onClick={() => handleDisplayImage("image4")}
  //         />
  //       </button>
  //     )}
  //   </div>
  // </div>;
