"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { toast } from "react-toastify";

function AdminForm() {
  const formRef = useRef(null);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
    toast.success("Admin details submitted successfully!", {
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
          <p className="text-gray-600 font-medium">Admin Contact*</p>
          <input
            className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
            type="text"
            id="adminContact"
            {...register("adminContact", {
              required: "Admin contact is required",
            })}
          />
          {errors.adminContact && (
            <p className="text-red-500 absolute">
              {errors.adminContact.message}
            </p>
          )}
        </div>
        <div className="mb-[3.5rem] relative">
          <p className="text-gray-600 font-medium">Admin Password*</p>
          <input
            className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
            type="password"
            id="adminPassword"
            {...register("adminPassword", {
              required: "Admin password is required",
            })}
          />
          {errors.adminPassword && (
            <p className="text-red-500 absolute">
              {errors.adminPassword.message}
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
            label={"Submit Admin Details"}
          />
          <Button label={"Cancel"} type="reset" onClick={() => reset()} />
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
