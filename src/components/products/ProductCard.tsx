"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import img from "../../../public/images/categories/classic-2.jpg";
import Button from "../ui/Button";
import { IoStar } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getCurrentQuantityById,
} from "@/store/features/cart/cartSlice";
import QuantityButton from "../ui/QuantityButton";

function ProductCard({
  product_id: id,
  img,
  category,
  title,
  price,
  description,
  rating,
}) {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push({
  //     pathname: `/product-details/${id}`,
  //     query: { img, category, title, price, description, rating },
  //   });
  // };
  const dispatch = useDispatch();

  const [showButton, setShowButton] = useState(true);
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  useEffect(() => {
    if (currentQuantity === 0) {
      setShowButton(true);
    }
    if (currentQuantity > 0) {
      setShowButton(false);
    }
  }, [currentQuantity]);

  const handleAddToCart = () => {
    const newItem = {
      productId: id,
      title,
      quantity: 1,
      unitPrice: price,
      img,
      category,
      description,
    };
    dispatch(addItem(newItem));
  };
  return (
    <div
      // onClick={handleClick}
      className="w-[29rem] rounded-2xl p-4 shadow-2xl border-2 border-gray-100"
    >
      <div>
        <Image
          className="w-[100%] h-[40rem] object-contain"
          src={img}
          width={300}
          height={400}
          alt=""
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-[2rem] font-semibold text-gray-600 line-clamp-1">
            {/* Men's casual blazer */}
            {title}
          </h1>
          {/* Rating section */}
          <div className="flex items-center justify-center gap-x-2 bg-green-400 w-[6rem] h-[2.6rem] text-gray-50">
            <div>
              <IoStar className="text-[2rem] " />
            </div>
            <p className="font-semibold ">{rating}</p>
          </div>
        </div>
        <p className="text-gray-600 line-clamp-1">
          {/* Mens black casual blazer with graphical printing */}
          {description}
        </p>
        {/* add to cart */}
        <div className="flex items-center justify-between mt-4 mr-4">
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
              type="card"
              label="Add to cart"
            />
          ) : (
            <QuantityButton currentQuantity={currentQuantity} productId={id} />
          )}
          <p className="text-[3rem] text-gray-900 font-semibold">৳ {price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
