"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { upsertCoupon } from "../../../utils/coupon";

function CouponForm() {
  const formRef = useRef(null);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    const filteredData = Object.keys(data)
      .filter((key) => key === "coupon_code" || key === "discount_percent")
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    try {
      await upsertCoupon(filteredData);
      toast.success("Coupon added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      reset(); // Reset the form fields
    } catch (error) {
      toast.error("An error occurred while adding the coupon.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const onError = (errors) => {
    console.error(errors);
    toast.error("Please fix the errors in the form.", {
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

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-[3.5rem] relative">
          <p className="text-gray-600 font-medium">Provide coupon code*</p>
          <input
            className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
            type="text"
            id="coupon_code"
            {...register("coupon_code", {
              required: "Coupon code is required",
            })}
          />
          {errors.coupon_code && (
            <p className="text-red-500 absolute">
              {errors.coupon_code.message}
            </p>
          )}
        </div>
        <div className="mb-[3.5rem] relative">
          <p className="text-gray-600 font-medium">
            Provide discount percentage*
          </p>
          <input
            className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
            type="text"
            id="discount_percent"
            {...register("discount_percent", {
              required: "Discount percentage is required",
            })}
          />
          {errors.discount_percent && (
            <p className="text-red-500 absolute">
              {errors.discount_percent.message}
            </p>
          )}
        </div>
        <div>
          <input type="submit" className="hidden" />
        </div>
        <div className="flex items-center gap-x-6">
          <Button
            onClick={() => {
              if (formRef.current) {
                handleSubmit(onSubmit)();
              }
            }}
            label={"Add a new Coupon"}
          />
          <Button label={"Cancel"} type="reset" onClick={() => reset()} />
        </div>
      </form>
    </div>
  );
}

export default CouponForm;
