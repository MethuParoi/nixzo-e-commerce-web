"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import signupImage from "../../../../public/signup.svg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

function SignIn() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth-user-signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, password }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        alert("Signin successful!");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // const handleSignin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/auth-user-signin/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ contact, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();

  //     if (data.success) {
  //       alert("Signin successful!");
  //     } else {
  //       alert("Invalid username or password");
  //     }
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  return (
    <>
      <div className="grid md:grid-cols-2 h-[100dvh]">
        <div className="grid-cols-1 bg-gray-200">
          <div className="flex flex-col items-center justify-center h-[38dvh] md:h-[90dvh]">
            <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem] hidden md:block">
              Sign in
            </h1>
            <Image
              className="md:w-[50rem] w-[30rem]"
              src={signupImage}
              alt="Signup"
            />
          </div>
        </div>
        <div className="grid-cols-1">
          <div className="hidden p-[2rem] md:flex items-center justify-end">
            <Button
              type="default"
              label="Admin Signin"
              onClick={() => route.push("/signin/admin")}
            />
          </div>
          <div className="flex flex-col items-center md:justify-center md:h-[90dvh] mb-[2rem] md:mb-0">
            <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0">
              Sign in to your account
            </h1>
            <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px-[1rem]">
              Enter your contact no and password below to sign in to your
              account
            </p>
            <input
              className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
              type="text"
              placeholder="Enter contact no"
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem] mb-[5rem]"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignin} label={"Sign in"} type="auth" />
            <p className="mt-[1.5rem] text-[1.2rem]">
              Don't have an account?
              <span className="font-semibold underline ml-[1rem]">
                <Link href="/signup">sign up</Link>
              </span>
            </p>
            <p className="font-semibold underline my-[1rem]">
              <Link href="/signin">forgot password</Link>
            </p>
          </div>
          <div className="md:hidden p-[1rem] flex items-center justify-center">
            <Button
              type="default"
              label="Admin Signin"
              onClick={() => route.push("/signin/admin")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

