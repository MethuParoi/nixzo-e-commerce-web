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
  }, [coupon, totalPrice]);

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
  }, [totalCartPrice, totalPrice, totalCartQuantity, dispatch]);

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
        <div className="grid grid-cols-1 md:grid-cols-3 md:h-[60rem] min-h-[80rem] xl:w-[120rem] 2xl:w-[150rem] my-[4rem]">
          <div className="md:col-span-2 ">
            <div className="hidden md:grid md:grid-cols-5 xl:grid-cols-7  lg:text-[2rem] font-medium">
              <div className="col-span-2 xl:col-span-4 ">PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>SUBTOTAL</div>
              <hr className="xl:w-[96rem] lg:w-[66rem] md:w-[50rem] h-1 border-0 rounded bg-gray-400 mt-2" />
            </div>
            <div className="md:hidden">
              <p className="text-[1.8rem] text-secondary-light font-semibold">
                CART ITEMS
              </p>
              <hr className="w-[30rem] sm:w-[55rem] h-1 border-0 rounded bg-gray-400 mt-2" />
            </div>
            {/* map function */}
            {/* <CartItems /> */}
            <div className="max-h-[75rem] overflow-y-auto">
              {cart.map((item) => (
                <CartItems item={item} key={item.product_id} />
              ))}
            </div>
          </div>

          {/* Cart total */}
          <div className="md:border-l-[.3rem] md:border-l-gray-400 md:pl-[4rem] container mx-auto">
            <div className="flex items-center md:justify-start justify-center mx-auto">
              <h2 className="lg:text-[2rem] font-medium">CART TOTALS</h2>
            </div>
            <hr className="w-[28rem] sm:w-[32rem] lg:w-[45rem] xl:w-[47rem] h-1 border-0 rounded bg-gray-400 mt-2 mx-auto" />
            <div className="flex items-center justify-between mt-[2rem] xl:w-[45rem] lg:w-[40rem] sm:w-[30rem] w-[28rem] mx-auto">
              <p className="text-[1.8rem] text-secondary-light font-medium">
                MRP
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

            <hr className=" xl:w-[47rem] lg:w-[42rem] sm:w-[32rem] w-[28rem] h-1 border-0 rounded bg-gray-300 mt-2 mx-auto" />
            <div className="flex items-center justify-between mt-[2rem] mb-[2rem] xl:w-[45rem] lg:w-[40rem] md:w-[30rem] w-[28rem] mx-auto">
              <p className="text-[1.8rem] text-secondary-light font-medium">
                {couponApplied ? "Discounted Amount" : "Total Amount"}
              </p>
              <p className="text-[1.8rem] font-bold">৳ {totalPrice}</p>
            </div>

            {/* Coupons section */}
            <div className="mb-[4rem]">
              {couponApplied ? (
                <div>
                  <div className="flex items-center gap-x-4 justify-center">
                    <div className="text-[1.8rem] md:text-[2.5rem] text-secondary-light">
                      <MdDiscount />
                    </div>
                    <h2 className="md:text-[2rem] text-secondary-light font-medium">
                      {couponData[0].discount_percent}% Discount Applied
                    </h2>
                  </div>
                  <hr className=" xl:w-[47rem] lg:w-[42rem] sm:w-[32rem] w-[28rem] h-1 border-0 rounded bg-gray-300 mt-2 mx-auto" />
                  <div className="flex items-center justify-between mt-[2rem] mb-[2rem] xl:w-[45rem] lg:w-[40rem] sm:w-[30rem] w-[28rem] mx-auto">
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
                  <div className="flex items-center justify-center gap-x-4 mx-auto">
                    <div className="text-[1.8rem] md:text-[2.5rem] text-secondary-light">
                      <MdDiscount />
                    </div>
                    <h2 className="md:text-[2rem] text-secondary-light font-medium">
                      Coupon
                    </h2>
                  </div>
                  <hr className="xl:w-[47rem] lg:w-[42rem] sm:w-[32rem] w-[30rem] h-1 border-0 rounded bg-gray-300 mt-2 mx-auto" />
                  <div className="flex items-center justify-center md:hidden">
                    <input
                      className="xl:w-[48rem] lg:w-[42rem] sm:w-[32rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[3rem] shadow-md mb-[2rem]"
                      type="text"
                      placeholder="Enter coupon code"
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                  </div>
                  <input
                    className="xl:w-[48rem] lg:w-[42rem] md:w-[32rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[3rem] shadow-md mb-[2rem] hidden md:block"
                    type="text"
                    placeholder="Enter coupon code"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <div className="md:hidden flex justify-center items-center ">
                    <Button
                      disabled={couponApplied}
                      onClick={handleApplyCoupon}
                      type="auth-transparent"
                      label="Apply Coupon"
                    />
                  </div>
                  <div className="hidden md:flex justify-center items-center xl:w-[48rem] lg:w-[42rem] md:w-[32rem] w-[30rem]">
                    <Button
                      disabled={couponApplied}
                      onClick={handleApplyCoupon}
                      type="auth-transparent"
                      label="Apply Coupon"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="md:hidden flex justify-center items-center ">
              <Button
                onClick={() => {
                  if (totalCartQuantity > 0) {
                    router.push("cart/checkout");
                  }
                }}
                type="auth-cart"
                label="PROCEED TO CHECKOUT"
              />
            </div>
            <div className="hidden md:flex justify-center items-center xl:w-[48rem] lg:w-[42rem] md:w-[32rem] w-[30rem]">
              <Button
                onClick={() => {
                  if (totalCartQuantity > 0) {
                    router.push("cart/checkout");
                  }
                }}
                type="auth-cart"
                label="PROCEED TO CHECKOUT"
              />
            </div>
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
