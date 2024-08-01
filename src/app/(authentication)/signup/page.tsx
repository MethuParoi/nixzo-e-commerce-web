"use client";

import Image from "next/image";
import React from "react";
import signupImage from "../../../../public/signup.svg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUp() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 h-[100dvh]">
      <div className="grid-cols-1 bg-gray-200">
        <div className="flex flex-col items-center justify-center h-[100dvh]">
          <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem]">
            Sign Up
          </h1>
          <Image className="w-[50rem] " src={signupImage} alt="" />
        </div>
      </div>
      <div className="grid-cols-1">
        <div className="flex flex-col items-center justify-center h-[100dvh]">
          <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem]">
            Create an account
          </h1>
          <p className="text-gray-600 text-[1.6rem]">
            Enter your contact no below to create your account
          </p>
          <input
            className="lg:w-[50rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] my-[3rem]"
            type="text"
            placeholder="Enter contact no"
          />
          <Button
            onClick={() => router.push("signup/otp")}
            label={"Sign up with contact no."}
            type="auth"
          />
          <p className="mt-[1.5rem] text[1.2rem]">
            Already have an account?{" "}
            <span className="font-semibold underline  ml-[1rem]">
              <Link href="/signin">sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
