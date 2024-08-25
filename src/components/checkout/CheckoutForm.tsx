"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { placeOrder } from "../../../utils/placeOrder";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import { getCart } from "@/store/features/cart/cartSlice";

function CheckoutForm() {
  //using redux store
  const subtotal = useSelector((state) => state.checkout.subtotal);
  const total = useSelector((state) => state.checkout.total);
  const cart = useSelector(getCart);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(cart);

  const formRef = useRef(null);

  const onSubmit = (data) => {
    const filteredData = Object.keys(data)
      .filter(
        (key) =>
          key.includes("_") ||
          key == "District" ||
          key == "Email" ||
          key == "Total_price" ||
          key == "Cart_items"
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    console.log(filteredData);
    placeOrder(filteredData);
  };

  return (
    <div className="flex items-start justify-between gap-x-[4rem] mr-[12rem]">
      <div>
        <h1 className="text-[2.5rem] font-semibold mb-[2rem]">CheckoutForm</h1>
        <div>
          <form ref={formRef}>
            <div className="flex items-center gap-x-[4rem]">
              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium">First Name*</p>
                <input
                  className="xl:w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] shadow-md mt-[1rem]"
                  type="text"
                  placeholder="First name"
                  {...register("First_name", {
                    required: "First name is required",
                    minLength: { value: 3, message: "Minimum length is 3" },
                    maxLength: { value: 80, message: "Maximum length is 80" },
                  })}
                />
                {errors.First_name && (
                  <p className="text-red-500 absolute">
                    {errors.First_name.message}
                  </p>
                )}
              </div>
              <div className="mb-[3.5rem] relative">
                <p className="text-gray-600 font-medium">Last Name*</p>
                <input
                  className="w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                  type="text"
                  placeholder="Last name"
                  {...register("Last_name", {
                    required: "Last name is required",
                    minLength: { value: 3, message: "Minimum length is 3" },
                    maxLength: { value: 100, message: "Maximum length is 100" },
                  })}
                />
                {errors.Last_name && (
                  <p className="text-red-500 absolute">
                    {errors.Last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Street address*</p>
              <input
                className="w-[74rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="Street address"
                {...register("Street_address", {
                  required: "Street address is required",
                  minLength: { value: 4, message: "Minimum length is 4" },
                })}
              />
              {errors.Street_address && (
                <p className="text-red-500 absolute">
                  {errors.Street_address.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Town/City*</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="Town/City"
                {...register("Town_City", {
                  required: "Town/City is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
              {errors.Town_City && (
                <p className="text-red-500 absolute">
                  {errors.Town_City.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">District*</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="District"
                {...register("District", {
                  required: "District is required",
                  minLength: { value: 2, message: "Minimum length is 2" },
                })}
              />
              {errors.District && (
                <p className="text-red-500 absolute">
                  {errors.District.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Mobile number*</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="tel"
                placeholder="Mobile number"
                {...register("Mobile_number", {
                  required: "Mobile number is required",
                  minLength: { value: 11, message: "Minimum length is 11" },
                  maxLength: { value: 11, message: "Maximum length is 11" },
                  pattern: {
                    value: /^01[0-9]{9}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {errors.Mobile_number && (
                <p className="text-red-500 absolute">
                  {errors.Mobile_number.message}
                </p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Email(optional)</p>
              <input
                className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
                type="text"
                placeholder="Email"
                {...register("Email", {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.Email && (
                <p className="text-red-500 absolute">{errors.Email.message}</p>
              )}
            </div>

            {/* hidden inputs */}
            <input
              className="hidden"
              type="text"
              {...register("Total_price", {
                value: total,
              })}
            />

            <input
              className="hidden"
              type="text"
              {...register("Cart_items", {
                value: cart,
              })}
            />

            <input type="submit" className="hidden" />
          </form>
        </div>
      </div>

      {/* checkout data */}
      <div className="mt-[8rem]">
        <div className="border-l-[.3rem] border-l-gray-400 pl-[4rem]">
          <div className="flex items-center justify-start">
            <h2 className="text-[2rem] font-medium">CART TOTALS</h2>
          </div>
          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-400 mt-2" />
          <div className="flex items-center justify-between mt-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Subtotal
            </p>
            <p className="text-[1.8rem] font-bold">৳ {subtotal}</p>
          </div>
          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
          <div className="flex items-center justify-between mt-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Shipping
            </p>
            {/* shipping cost to be updated */}
            <p className="text-[1.8rem] font-bold">৳ 00</p>
          </div>

          <hr className="lg:w-[47rem] h-1 border-0 rounded bg-gray-300 mt-2" />
          <div className="flex items-center justify-between mt-[2rem] mb-[2rem]">
            <p className="text-[1.8rem] text-secondary-light font-medium">
              Total
            </p>
            <p className="text-[1.8rem] font-bold">৳ {total}</p>
          </div>

          <Button
            onClick={() => {
              if (formRef.current) {
                handleSubmit(onSubmit)();
              }
            }}
            type="auth"
            label="PROCEED TO CHECKOUT"
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
