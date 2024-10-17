"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import signupImage from "../../../../public/signup.svg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { setEmailUser } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import supabaseClient from "../../../../utils/supabaseClient";
import { Provider } from "@supabase/supabase-js";
import googleLogo from "../../../../public/images/logo/logo_google.png";
import {
  setUser,
  setUserAvatar,
  setUserName,
} from "@/store/features/auth/userSlice";
import { toast } from "react-toastify";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const dispatch = useDispatch();

  const handleSignin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    // e.preventDefault();
    try {
      const response = await fetch("/api/auth-user-signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // useEffect(() => {
      //   const fetchUser = async () => {
      //     const response = await fetch("/api/supabase-client");
      //     const data = await response.json();
      //     // setUser(data.user);
      //     // console.log("User avatar:", data.user.user_metadata.avatar_url);
      //     if (data.user) {
      //
      //     }
      //   };

      //   fetchUser();
      // }, [dispatch]);

      const data = await response.json();
      console.log("Data:", data.userId);

      if (data.success) {
        dispatch(setUser(data.userId));
        dispatch(setUserName(data.userName));
        dispatch(setUserAvatar(data.userAvatar));
        route.push("/");
        // alert("Signin successful!");
      } else {
        toast.error("Invalid user", {
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
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred. Please try again.");
    }
  };

  async function socialAuth(provider: Provider) {
    await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        // redirectTo: `${location.origin}/auth/callback`,
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL,
      },
    });
  }

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
              isActive={false}
              setActiveButton={() => {}}
            />
          </div>
          <div className="flex flex-col items-center md:justify-center md:h-[90dvh] mb-[2rem] md:mb-0">
            <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0">
              Sign in to your account
            </h1>
            <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px-[1rem]">
              sign in with your google account
            </p>
            <div className="mt-[3rem] ">
              <button
                onClick={() => socialAuth("google")}
                className="p-4 font-semibold lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] bg-primary-light hover:bg-primary-dark text-secondary-light  rounded-md border-2 border-gray-300 shadow-md flex items-center justify-center gap-x-5"
              >
                <Image className="w-[2.2rem]" src={googleLogo} alt="" />
                <p>Sign in with Google</p>
              </button>
            </div>

            <div className="flex flex-col items-center my-[2.5rem]">
              <p className=" font-semibold text-secondary">Or</p>
              <hr className="border-t-2  w-[50rem] border-gray-500 my-1" />
            </div>

            <div className="flex flex-col items-center  ">
              <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px-[1rem]">
                Enter your email address and password below to sign in to your
                account
              </p>
              <input
                className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
                type="text"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem] mb-[5rem]"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={(e) => {
                  handleSignin(e);
                }}
                label={"Sign in"}
                type="auth"
                isActive={false}
                setActiveButton={() => {}}
              />
            </div>
            <p className="mt-[1.5rem] text-[1.6rem]">
              Signup with email
              <span className="font-semibold underline ml-[1rem]">
                <Link href="/signup">sign up</Link>
              </span>
            </p>
          </div>
          <div className="md:hidden p-[1rem] flex items-center justify-center">
            <Button
              type="default"
              label="Admin Signin"
              onClick={() => route.push("/signin/admin")}
              isActive={false}
              setActiveButton={function (label: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

