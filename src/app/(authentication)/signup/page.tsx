"use client";
import Image from "next/image";
import React, { useRef } from "react";
import signupImage from "../../../../public/signup.svg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  setUser,
  setUserAvatar,
  setUserName,
} from "@/store/features/auth/userSlice";
import { getEmailUserId } from "../../../../utils/cart";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const route = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = React.useState(false);
  const formRef = useRef(null);

  const onSubmit = async (data) => {
    const { name, email, password, repeatedPassword } = data;

    if (password !== repeatedPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth-user-signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData) {
        // console.log(responseData.userId);
        dispatch(setUser(responseData.userId));
        dispatch(setUserName(responseData.userName));
        dispatch(setUserAvatar(responseData.userAvatar));
        route.push("/");
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid md:grid-cols-2 h-[100dvh]">
      <div className="grid-cols-1 bg-gray-200">
        <div className="flex flex-col items-center justify-center h-[38dvh] md:h-[90dvh]">
          <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem] hidden md:block">
            Sign Up
          </h1>
          <Image className="md:w-[50rem] w-[30rem]" src={signupImage} alt="" />
        </div>
      </div>
      <div className="grid-cols-1">
        <div className="flex flex-col items-center md:justify-center md:h-[90dvh] mb-[2rem] md:mb-0">
          <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0 line-clamp-3 text-center">
            Sign Up
          </h1>
          <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px-[1rem]">
            Enter your email address and password below to sign up to your
            account
          </p>
          <form ref={formRef} className="w-full flex flex-col items-center">
            <div className="mb-[3.5rem] relative">
              <input
                className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[1rem]"
                type="text"
                placeholder="Enter name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 15, message: "Maximum length is 15" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 absolute">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-[3.5rem] relative">
              <input
                className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem]"
                type="text"
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 absolute">{errors.email.message}</p>
              )}
            </div>

            <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] ">
              <input
                className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem]"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum length is 6" },
                  maxLength: { value: 12, message: "Maximum length is 12" },
                })}
              />
              <button
                type="button"
                className="absolute top-2 right-0 px-4 py-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 absolute">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3.5rem] mb-[5rem]">
              <input
                className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem]"
                type={showRepeatedPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("repeatedPassword", {
                  required: "Please confirm your password",
                  minLength: { value: 6, message: "Minimum length is 6" },
                  maxLength: { value: 12, message: "Maximum length is 12" },
                })}
              />
              <button
                type="button"
                className="absolute top-2 right-0 px-4 py-2"
                onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
              >
                {showRepeatedPassword ? "Hide" : "Show"}
              </button>
              {errors.repeatedPassword && (
                <p className="text-red-500 absolute">
                  {errors.repeatedPassword.message}
                </p>
              )}
            </div>
            <input type="submit" className="hidden" />
          </form>

          <Button
            onClick={() => {
              if (formRef.current) {
                handleSubmit(onSubmit)();
              }
            }}
            label={"Sign up"}
            type="auth"
          />
          <p className="mt-[1.5rem] text[1.2rem]">
            Signin with Google?
            <span className="font-semibold underline ml-[1rem]">
              <Link href="/signin">sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
