"use client";

import React, { use, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";

function OtpVerification({ onClick, length = 4 }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    //allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      handleOtpSubmit(combinedOtp);
    } else {
      //move to next input
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      //move to previous input clicking backspace
      inputRefs.current[index - 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };
  const handleOtpSubmit = (otp) => {};

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh]">
      <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem]">
        Enter OTP
      </h1>
      <p className="text-gray-600 text-[1.6rem]">
        Enter the OTP sent to your contact no
      </p>
      <div>
        {otp.map((value, index) => {
          return (
            <input
              type="text"
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[6rem] h-[6rem] rounded-[1rem] border-2 border-secondary px-[.2rem] my-[3rem] mx-[1rem] text-center text-[2rem] "
            />
          );
        })}
      </div>
      <Button
        onClick={() => console.log(otp)}
        label={"Verify OTP"}
        type="auth"
      />
      <p className="mt-[1.5rem] text[1.2rem]">
        Didn&apos;t got the otp?{" "}
        <span className="font-semibold underline  ml-[1rem]">
          <Link href="">Resend OTP</Link>
        </span>
      </p>
    </div>
  );
}

export default OtpVerification;
