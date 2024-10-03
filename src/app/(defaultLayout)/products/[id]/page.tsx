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
  getCart,
  getCurrentQuantityById,
} from "@/store/features/cart/cartSlice";
import QuantityButton from "@/components/ui/QuantityButton";
import { toast } from "react-toastify";
import { setCart, setEmailUserCart } from "../../../../../utils/cart";

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
  const [pids, setPids] = useState<string[]>([]);
  const [Pid, setPid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Updating cart to user account
  const user_id = useSelector((state: any) => state.user.user_id);
  console.log("User ID:", user_id);
  const user_avatar = useSelector((state: any) => state.user.user_avatar);
  useEffect(() => {
    const trimmedUserAvatar = user_avatar.trim().toLowerCase();
    const defaultAvatarUrl =
      "https://kjqzojrvmhadxwftawlo.supabase.co/storage/v1/object/public/product_images/profile-user.png";

    console.log("User Avatar:", trimmedUserAvatar);

    if (trimmedUserAvatar !== defaultAvatarUrl && user_id) {
      console.log("Updating cart for regular user");
      setCart(cart, user_id);
    }

    if (trimmedUserAvatar === defaultAvatarUrl && user_id) {
      console.log("Updating cart for email user");
      setEmailUserCart(cart, user_id);
    }
  }, [cart, user_id, user_avatar]);
  //--------------------------------

  useEffect(() => {
    if (cart.length > 0) {
      const pidsArray = cart.map((item) => item.productId);
      setPids(pidsArray);
    } else {
      setPids([]);
    }
  }, [cart]);

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("/").pop();
    setProductId(id || null);
  }, []);

  useEffect(() => {
    if (productId && pids.includes(productId)) {
      setPid(productId);
    }
  }, [productId, pids]);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProductDetails(data))
        .then(() => setLoading(false));
    }
  }, [productId]);

  const productID = productDetails?.id;

  // Determine which ID to use for fetching the current quantity
  const quantityId = Pid ? Pid : productID;
  const currentQuantity = useSelector(getCurrentQuantityById(quantityId));

  useEffect(() => {
    setShowButton(currentQuantity === 0);
  }, [currentQuantity]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (productDetails) {
      const newItem = {
        productId: productId,
        title: productDetails.title,
        quantity: 1,
        unitPrice: productDetails.price,
        img: productDetails.image,
        category: productDetails.category,
        description: productDetails.description,
        size: selectedSize,
      };
      dispatch(addItem(newItem));
    } else {
      console.error("Product details are not available");
    }

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
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-[4rem] lg:gap-y-0 my-[5rem]">
          <div className="flex flex-col-reverse md:flex-row gap-y-6 md:gap-y-0 md:gap-x-6">
            <div className="flex flex-row justify-center md:justify-normal md:flex-col gap-x-4 md:gap-x-0 md:gap-y-2">
              <button className="border-2 border-gray-400 rounded-xl h-[4.5rem] md:h-[8rem]">
                <Image
                  className="w-[2.8rem] md:w-[5rem] rounded-xl"
                  src={productDetails.image}
                  alt={productDetails.title}
                  width={50}
                  height={80}
                />
              </button>

              <button className="border-2 border-gray-400 rounded-xl h-[4.5rem] md:h-[8rem]">
                <Image
                  className="w-[2.8rem] md:w-[5rem] rounded-xl"
                  src={productDetails.image}
                  alt={productDetails.title}
                  width={50}
                  height={80}
                />
              </button>

              <button className="border-2 border-gray-400 rounded-xl h-[4.5rem] md:h-[8rem]">
                <Image
                  className="w-[2.8rem] md:w-[5rem] rounded-xl"
                  src={productDetails.image}
                  alt={productDetails.title}
                  width={50}
                  height={80}
                />
              </button>
            </div>
            <div className="w-[30rem] sm:w-[40rem] lg:w-[42rem] xl:w-[50rem] border-2 border-gray-200 p-5 rounded-xl">
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

          {/* Product details */}
          <div className="ml-[3rem]">
            <h1 className="text-[2.4rem] text-secondary-light font-bold lg:max-w-[50rem] xl:max-w-screen-xl line-clamp-1">
              {productDetails.title}
            </h1>
            <p className="text-[3rem] text-secondary-dark font-semibold">
              <span className="text-[2.4rem] text-secondary-light mr-[.5rem]">
                ৳
              </span>{" "}
              {productDetails.price}
            </p>
            <hr className="border-1 lg:w-[50rem] xl:w-[60rem] my-[1rem]" />
            <p className="text-[1.8rem] text-secondary-light font-semibold">
              Category: {productDetails.category}
            </p>
            <hr className="border-1 lg:w-[50rem] xl:w-[60rem] my-[1rem]" />
            <p className="text-[1.8rem] text-secondary-light font-semibold">
              Color: Gray{" "}
            </p>
            <hr className="border-1 lg:w-[50rem] xl:w-[60rem] my-[1rem]" />{" "}
            <div>
              {" "}
              <p className="text-[1.8rem] text-secondary-light font-semibold">
                Size:{" "}
              </p>{" "}
              <div className="my-[1rem] ">
                <SizeButtons
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                />{" "}
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
                  }}
                  type="auth"
                  label="Add to cart"
                  isActive={false} // depending on your logic
                  setActiveButton={() => {}} // provide a function or state setter here
                />
              ) : (
                <QuantityButton
                  currentQuantity={currentQuantity}
                  productId={Pid ? Pid : productID} // Conditionally set productId
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
