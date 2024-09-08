"use client";

import React, { use, useEffect, useState } from "react";
import CartItems from "./CartItems";
import Button from "../ui/Button";
import { MdDiscount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "@/store/features/cart/cartSlice";
import { toast } from "react-toastify";
import { getCoupon } from "../../../utils/coupon";
import Loader from "../ui/Loader/Loader";
import { useRouter } from "next/navigation";
import {
  setSubtotal,
  setShippingCost,
  setTotal,
} from "../../store/features/checkout/checkout";
import { getUserCart, setCart, setEmailUserCart } from "../../../utils/cart";

class NotFoundError extends Error {}

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //for coupon code
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(totalCartPrice);
  const [couponApplied, setCouponApplied] = useState(false);

  //updating cart to user account
  const user_id = useSelector((state: RootState) => state.user.user_id);
  const user_avatar = useSelector((state: RootState) => state.user.user_avatar);

  //cart
  console.log("cart:", cart);

  useEffect(() => {
    if (
      user_avatar !=
        "https://kjqzojrvmhadxwftawlo.supabase.co/storage/v1/object/public/product_images/profile-user.png" &&
      user_id
    ) {
      setCart(cart, user_id);
    }

    if (
      user_avatar ==
        "https://kjqzojrvmhadxwftawlo.supabase.co/storage/v1/object/public/product_images/profile-user.png" &&
      user_id
    ) {
      {
        setEmailUserCart(cart, user_id);
      }
    }

    // async function fetchUserCart() {
    //   const userCart = await getUserCart(user.user_id.id);
    //   setUserCart(userCart);
    // }
    // fetchUserCart();
  }, [cart, user_id, user_avatar]);

  //--------------------------------
  useEffect(() => {
    setTotalPrice(totalCartPrice);
  }, [totalCartPrice]);

  useEffect(() => {
    if (error) {
      // window.location.reload();
      // console.log("refresh done");
    }
  }, [error]);

  const router = useRouter();

  // Fetch coupon data from the supabase database
  useEffect(() => {
    async function fetchCoupon() {
      setIsLoading(true);
      try {
        const data = await getCoupon();
        setCouponData(data);
        const discount_fraction = data[0].discount_percent / 100;
        const discountValue = totalPrice * discount_fraction;
        const adjustedDiscount = Math.round(discountValue);
        setDiscount(adjustedDiscount);
      } catch (err) {
        console.error("Failed to fetch coupon:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCoupon();
  }, [coupon]);

  //match coupon code with the coupon code from the database
  const handleApplyCoupon = async () => {
    setIsLoading(true);

    try {
      if (couponData && couponData[0].coupon_code === coupon) {
        setTotalPrice(totalPrice - discount);
        setCouponApplied(true);
        setIsLoading(false);
        toast.success("Coupon applied succesfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (couponData && couponData[0].coupon_code != coupon) {
        // alert("Invalid username or password");
        toast.error("Invalid coupon!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  //setting redux state
  useEffect(() => {
    dispatch(setSubtotal(totalCartPrice));
    dispatch(setShippingCost(0)); // Assuming shipping cost is 0 for now
    dispatch(setTotal(totalPrice));
  }, [totalCartPrice, totalPrice, totalCartQuantity]);

  if (!cart.length)
    return (
      <div className="flex items-center justify-center h-[60rem]">
        <h1 className="text-[3rem] font-medium">Your cart is empty</h1>
      </div>
    );

  try {
    return (
      <div>
        {isLoading && <Loader />}
        <div className="grid grid-cols-3 h-[60rem] xl:w-[120rem] 2xl:w-[150rem] my-[4rem]">
          <div className="col-span-2">
            <div className="grid grid-cols-7 text-[2rem] font-medium">
              <div className="col-span-4 ">PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>SUBTOTAL</div>
              <hr className="lg:w-[96rem] h-1 border-0 rounded bg-gray-400 mt-2" />
            </div>
            {/* map function */}
            {/* <CartItems /> */}
            {cart.map((item) => (
              <CartItems item={item} key={item.product_id} />
            ))}
          </div>

          {/* Cart total */}
          <div className="border-l-[.3rem] border-l-gray-400 pl-[4rem]">
            <div className="flex items-center justify-start">
              <h2 className="text-[2rem] font-medium">CART TOTALS</h2>
            </div>
            <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-400 mt-2" />
            <div className="flex items-center justify-between mt-[2rem]">
              <p className="text-[1.8rem] text-secondary-light font-medium">
                {couponApplied ? "Without discount" : "Subtotal"}
              </p>
              <p className="text-[1.8rem] font-bold">৳ {totalCartPrice}</p>
            </div>
            {/* <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
            <div className="flex items-center justify-between mt-[2rem]">
              <p className="text-[1.8rem] text-secondary-light font-medium">
                Shipping
              </p>
              {/* shipping cost to be updated }
              <p className="text-[1.8rem] font-bold">৳ 00</p>
            </div> */}

            <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
            <div className="flex items-center justify-between mt-[2rem] mb-[2rem]">
              <p className="text-[1.8rem] text-secondary-light font-medium">
                {couponApplied ? "Discounted price" : "Total"}
              </p>
              <p className="text-[1.8rem] font-bold">৳ {totalPrice}</p>
            </div>

            {/* Coupons section */}
            <div className="mb-[4rem]">
              {couponApplied ? (
                <div>
                  <div className="flex items-center gap-x-4 ">
                    <div className="text-[2.5rem] text-secondary-light">
                      <MdDiscount />
                    </div>
                    <h2 className="text-[2rem] text-secondary-light font-medium">
                      {couponData[0].discount_percent}% Discount Applied
                    </h2>
                  </div>
                  <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
                  <div className="flex items-center justify-between mt-[2rem] mb-[2rem]">
                    <p className="text-[1.8rem] text-green-500 font-medium">
                      You saved
                    </p>
                    <p className="text-[1.8rem] text-green-500 font-bold">
                      ৳ {discount}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-x-4 ">
                    <div className="text-[2.5rem] text-secondary-light">
                      <MdDiscount />
                    </div>
                    <h2 className="text-[2rem] text-secondary-light font-medium">
                      Coupon
                    </h2>
                  </div>
                  <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
                  <input
                    className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[3rem] shadow-md mb-[2rem]"
                    type="text"
                    placeholder="Enter coupon code"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button
                    disabled={couponApplied}
                    onClick={handleApplyCoupon}
                    type="auth-transparent"
                    label="Apply Coupon"
                  />
                </div>
              )}
            </div>
            <Button
              onClick={() => {
                if (totalCartQuantity > 0) {
                  router.push("cart/checkout");
                }
              }}
              type="auth"
              label="PROCEED TO CHECKOUT"
            />
          </div>
        </div>
      </div>
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      setError(true);
    } else {
      throw e;
    }
  }
}

export default Cart;
