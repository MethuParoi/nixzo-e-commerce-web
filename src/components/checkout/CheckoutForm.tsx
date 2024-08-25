"use client";

import React from "react";
import { useForm } from "react-hook-form";

function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <h1 className="text-[2.5rem] font-semibold mb-[2rem]">CheckoutForm</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-x-[4rem]">
            <div className=" mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">First Name*</p>
              <input
                className="xl:w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem]  shadow-md mt-[1rem] "
                type="text"
                placeholder="First name"
                {...register("First name", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 80, message: "Maximum length is 80" },
                })}
              />
              {errors["First name"] && (
                <p className="text-red-500 absolute">
                  {errors["First name"].message}
                </p>
              )}
            </div>
            <div className=" mb-[3.5rem] relative">
              <p className="text-gray-600 font-medium">Last Name*</p>
              <input
                className="w-[35rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md "
                type="text"
                placeholder="Last name"
                {...register("Last name", {
                  required: "Last name is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 100, message: "Maximum length is 100" },
                })}
              />
              {errors["Last name"] && (
                <p className="text-red-500 absolute">
                  {errors["Last name"].message}
                </p>
              )}
            </div>
          </div>

          <div className=" mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Street address*</p>
            <input
              className="w-[74rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md "
              type="text"
              placeholder="Street address"
              {...register("Street address", {
                required: "Street address is required",
                minLength: { value: 4, message: "Minimum length is 4" },
              })}
            />
            {errors["Street address"] && (
              <p className="text-red-500 absolute">
                {errors["Street address"].message}
              </p>
            )}
          </div>

          <div className=" mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Town/City*</p>
            <input
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              type="text"
              placeholder="Town/City"
              {...register("Town/City", {
                required: "Town/City is required",
                minLength: { value: 3, message: "Minimum length is 3" },
              })}
            />
            {errors["Town/City"] && (
              <p className="text-red-500 absolute">
                {errors["Town/City"].message}
              </p>
            )}
          </div>

          <div className=" mb-[3.5rem] relative">
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
            {errors["District"] && (
              <p className="text-red-500 absolute">
                {errors["District"].message}
              </p>
            )}
          </div>

          <div className=" mb-[3.5rem] relative">
            <p className="text-gray-600 font-medium">Mobile number*</p>
            <input
              className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
              type="tel"
              placeholder="Mobile number"
              {...register("Mobile number", {
                required: "Mobile number is required",
                minLength: { value: 11, message: "Minimum length is 11" },
                maxLength: { value: 11, message: "Maximum length is 11" },
                pattern: {
                  value: /^01[0-9]{9}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors["Mobile number"] && (
              <p className="text-red-500 absolute">
                {errors["Mobile number"].message}
              </p>
            )}
          </div>

          <div className=" mb-[3.5rem] relative">
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
            {errors["Email"] && (
              <p className="text-red-500 absolute">{errors["Email"].message}</p>
            )}
          </div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
