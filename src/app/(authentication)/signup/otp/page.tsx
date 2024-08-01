import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import signupImage from "../../../../../public/signup.svg";
import OtpVerification from "@/components/auth/OtpVerification";

function OtpValidation() {
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
        <OtpVerification />
      </div>
    </div>
  );
}

export default OtpValidation;