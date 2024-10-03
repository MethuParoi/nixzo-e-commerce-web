"use client";
import Image from "next/image";
import React, { useState } from "react";
import signupImage from "../../../../../public/signup.svg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import AdminLayout from "./layout";
import Loader from "@/components/ui/Loader/Loader";

function SignIn() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    // e.preventDefault();
    try {
      const response = await fetch("/api/auth-admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        route.push("/admin/dashboard");
        dispatch(setAdmin());
        setIsLoading(false);
      } else {
        // alert("Invalid username or password");
        toast.error("Invalid username or password!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div>
        {isLoading && <Loader />}
        <div className="grid md:grid-cols-2 h-[100dvh]">
          <div className="grid-cols-1 bg-gray-200">
            <div className="flex flex-col items-center justify-center h-[38dvh] md:h-[90dvh]">
              <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem] hidden md:block">
                Admin Sign in
              </h1>
              <Image
                className="md:w-[50rem] w-[30rem]"
                src={signupImage}
                alt=""
              />
            </div>
          </div>
          <div className="grid-cols-1">
            <div className="hidden p-[2rem] md:flex items-center justify-end">
              <Button
                type="default"
                label="User Signin"
                onClick={() => route.push("/signin")}
                isActive={false}
                setActiveButton={function (label: string): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
            <div className="flex flex-col items-center md:justify-center md:h-[90dvh] mb-[2rem] md:mb-0">
              <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0 line-clamp-3 text-center">
                Sign in to your admin account
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
              {/* <Button onClick={() => handleSignin()} label={"Sign in"} type="auth" /> */}
              <div className="md:hidden p-[1rem] flex items-center justify-center">
                <Button
                  disabled={false}
                  isActive={false}
                  type="default"
                  label="User Signin"
                  onClick={() => route.push("/signin")}
                  setActiveButton={function (label: string): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default SignIn;
