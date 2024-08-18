"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import SizeButtons from "../../../../components/product-details/SizeButtons";
import Button from "../../../../components/ui/Button";
import ReactImageMagnify from "react-image-magnify";
import Loader from "../../../../components/ui/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getCurrentQuantityById,
} from "@/store/features/cart/cartSlice";
import QuantityButton from "@/components/ui/QuantityButton";
import { toast } from "react-toastify";

interface Product {
  id: string;
  image: string;
  category: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
  };
}

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("/").pop();
    setProductId(id || null);
  }, []);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProductDetails(data))
        .then(() => setLoading(false));
    }
  }, [productId]);

  const productID = productDetails?.id; // Use productDetails to get the productId
  const currentQuantity = useSelector(getCurrentQuantityById(productID));

  useEffect(() => {
    if (currentQuantity === 0) {
      setShowButton(true);
    }
    if (currentQuantity > 0) {
      setShowButton(false);
    }
  }, [currentQuantity]);

  const handleAddToCart = () => {
    if (productDetails) {
      const newItem = {
        productId: productId,
        title: productDetails.title,
        quantity: 1,
        unitPrice: productDetails.price,
        img: productDetails.image,
        category: productDetails.category,
        description: productDetails.description,
      };
      dispatch(addItem(newItem));
    } else {
      console.error("Product details are not available");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {productDetails && (
        <div className="flex items-start my-[5rem]">
          <div className="flex gap-x-6">
            <div className="flex flex-col gap-y-2">
              <button className="border-2 border-gray-400 rounded-xl">
                <Image
                  className="w-[5rem] rounded-xl"
                  src={productDetails.image}
                  alt={productDetails.title}
                  width={50}
                  height={80}
                />
              </button>

              <button className="border-2 border-gray-400 rounded-xl">
                <Image
                  className="w-[5rem] rounded-xl"
                  src={productDetails.image}
                  alt={productDetails.title}
                  width={50}
                  height={80}
                />
              </button>

              <button className="border-2 border-gray-400 rounded-xl">
                <Image
                  className="w-[5rem] rounded-xl"
                  src={productDetails.image}
                  alt={productDetails.title}
                  width={50}
                  height={80}
                />
              </button>
            </div>
            <div className="w-[50rem] ">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "product image",
                    isFluidWidth: true,
                    src: productDetails.image,
                  },
                  imageStyle: {
                    objectFit: "fill",
                    width: "100%",
                    height: "100%",
                  },
                  largeImage: {
                    src: productDetails.image,
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
            </div>
          </div>
          <div className="ml-[3rem]">
            <h1 className="text-[2.4rem] text-secondary-light font-bold">
              {productDetails.title}
            </h1>
            <p className="text-[3rem] text-secondary-dark font-semibold">
              <span className="text-[2.4rem] text-secondary-light mr-[.5rem]">
                ৳
              </span>{" "}
              {productDetails.price}
            </p>
            <hr className="border-1 w-[60rem] my-[1rem]" />
            <p className="text-[1.8rem] text-secondary-light font-semibold">
              Category: {productDetails.category}
            </p>
            <hr className="border-1 w-[60rem] my-[1rem]" />
            <p className="text-[1.8rem] text-secondary-light font-semibold">
              Color: Gray{" "}
            </p>
            <hr className="border-1 w-[60rem] my-[1rem]" />{" "}
            <div>
              {" "}
              <p className="text-[1.8rem] text-secondary-light font-semibold">
                Size:{" "}
              </p>{" "}
              <div className="my-[1rem] ">
                <SizeButtons />{" "}
              </div>{" "}
            </div>
            <div>
              <p className="text-[1.8rem] text-secondary-light font-semibold">
                Description:
              </p>
              <p className="line-clamp-3 max-w-[50rem]">
                {productDetails.description}
              </p>
            </div>
            <div className="mt-[3rem]">
              {showButton ? (
                <Button
                  onClick={() => {
                    handleAddToCart();
                    toast.success("Item added to the cart", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                  type="auth"
                  label="Add to cart"
                />
              ) : (
                <QuantityButton
                  currentQuantity={currentQuantity}
                  productId={productID}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
