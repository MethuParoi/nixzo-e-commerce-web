import Image from "next/image";
import React from "react";
import signupImage from "../../../../public/signup.svg";
import Button from "@/components/navbar/Button";
import Link from "next/link";

function SignIn() {
  return (
    <div className="grid grid-cols-2 h-[100dvh]">
      <div className="grid-cols-1 bg-gray-200">
        <div className="flex flex-col items-center justify-center h-[100dvh]">
          <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem]">
            Sign in
          </h1>
          <Image className="w-[50rem] " src={signupImage} alt="" />
        </div>
      </div>
      <div className="grid-cols-1">
        <div className="flex flex-col items-center justify-center h-[100dvh]">
          <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem]">
            Sign in to your account
          </h1>
          <p className="text-gray-600 text-[1.6rem]">
            Enter your contact no and password below to sign in to your account
          </p>
          <input
            className="lg:w-[50rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
            type="text"
            placeholder="Enter contact no"
          />
          <input
            className="lg:w-[50rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem] mb-[5rem]"
            type="text"
            placeholder="Enter password"
          />
          <Button
            onClick={console.log("btn clicked")}
            label={"Sign in"}
            type="auth"
          />
          <p className="mt-[1.5rem] text[1.2rem]">
            Don't have an account?
            <span className="font-semibold underline ml-[1rem]">
              <Link href="/signup">sign up</Link>
            </span>
          </p>
          <p className="font-semibold underline my-[1rem]">
            <Link href="/signin">forgot password</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
