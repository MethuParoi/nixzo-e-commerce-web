"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { insertAdmin } from "../../../utils/admin";

function AdminForm() {
  const formRef = useRef(null);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    const filteredData = Object.keys(data)
      .filter(
        (key) =>
          key === "admin_contact" ||
          key === "admin_password" ||
          key === "user_type"
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    // Set the user type to admin
    filteredData.user_type = "admin";

    try {
      await insertAdmin(filteredData);
      //   console.log(filteredData);
      toast.success("Admin added successfully!", {
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
      toast.error("An error occurred while adding the admin.", {
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
          <p className="text-gray-600 font-medium">Admin Username*</p>
          <input
            className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
            type="text"
            id="admin_contact"
            {...register("admin_contact", {
              required: "Admin username is required",
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 15, message: "Maximum length is 15" },
            })}
          />
          {errors.admin_contact && (
            <p className="text-red-500 absolute">
              {errors.admin_contact.message}
            </p>
          )}
        </div>
        <div className="mb-[3.5rem] relative">
          <p className="text-gray-600 font-medium">Admin Password*</p>
          <input
            className="w-[75rem] h-[5rem] rounded-[1rem] border-2 border-primary-dark px-[1rem] mt-[1rem] shadow-md"
            type="password"
            id="admin_password"
            {...register("admin_password", {
              required: "Admin password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 6 || "Minimum length is 6 characters",
                maxLength: (value) =>
                  value.length <= 15 || "Maximum length is 15 characters",
                hasNumber: (value) =>
                  /\d/.test(value) || "Password must contain a number",
              },
            })}
          />
          {errors.admin_password && (
            <p className="text-red-500 absolute">
              {errors.admin_password.message}
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
