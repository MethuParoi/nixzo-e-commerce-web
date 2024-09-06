"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import signupImage from "../../../../public/signup.svg";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRouter();

  const handleSignup = async (e) => {
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

      const data = await response.json();

      if (data.success) {
        alert("Signup successful!");
      } else {
        alert(data.message);
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
          <input
            className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
            type="text"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3rem]">
            <input
              className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem]  "
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-2 right-0 px-4 py-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3rem] mb-[5rem]">
            <input
              className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] "
              type={showRepeatedPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setRepeatedPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-2 right-0 px-4 py-2"
              onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
            >
              {showRepeatedPassword ? "Hide" : "Show"}
            </button>
          </div>
          <Button onClick={handleSignup} label={"Sign up"} type="auth" />
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

//----------------------------V0--------------------------------

// "use client";
// import Image from "next/image";
// import React, { use, useEffect, useState } from "react";
// import signupImage from "../../../../public/signup.svg";
// import Button from "@/components/ui/Button";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { setAdmin } from "@/store/features/auth/authSlice";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/store/store";
// import { v4 as uuidv4 } from "uuid";

// function SignIn() {
//   // const user = useSelector((state: RootState) => state.auth.user);
//   // const dispatch = useDispatch();

//   const [email, setEmail] = useState("");
//   const [user_id, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatedPassword, setRepeatedPassword] = useState("");
//   const [name, setName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const route = useRouter();

//   // Generate a unique ID for the new user
//   const userId = uuidv4();
//   useEffect(() => {
//     setUserId(userId);
//   }, [userId]);

//   const handleSignup = async (e) => {
//     // e.preventDefault();
//     if (password !== repeatedPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     try {
//       const response = await fetch("/api/auth-user-signup/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_id, name, email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();

//       if (data.success) {
//         // route.push("/admin/dashboard");
//         alert("Signup successful!");
//         // dispatch(setAdmin());
//       } else {
//         alert("User already exists");
//       }
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-2 h-[100dvh]">
//       <div className="grid-cols-1 bg-gray-200">
//         <div className="flex flex-col items-center justify-center h-[38dvh] md:h-[90dvh]">
//           <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem] hidden md:block">
//             Sign Up
//           </h1>
//           <Image className="md:w-[50rem] w-[30rem]" src={signupImage} alt="" />
//         </div>
//       </div>
//       <div className="grid-cols-1">
//         <div className="flex flex-col items-center md:justify-center md:h-[90dvh] mb-[2rem] md:mb-0">
//           <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0 line-clamp-3 text-center">
//             Sign Up
//           </h1>
//           <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px-[1rem]">
//             Enter your email address and password below to sign up to your
//             account
//           </p>
//           <input
//             className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
//             type="text"
//             placeholder="Enter name"
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
//             type="text"
//             placeholder="Enter email address"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3rem]">
//             <input
//               className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem]  "
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="absolute top-2 right-0 px-4 py-2"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3rem] mb-[5rem]">
//             <input
//               className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] "
//               type={showRepeatedPassword ? "text" : "password"}
//               placeholder="Confirm password"
//               onChange={(e) => setRepeatedPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="absolute top-2 right-0 px-4 py-2"
//               onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
//             >
//               {showRepeatedPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           <Button onClick={handleSignup} label={"Sign up"} type="auth" />
//           <p className="mt-[1.5rem] text[1.2rem]">
//             Signin with Google?
//             <span className="font-semibold underline ml-[1rem]">
//               <Link href="/signin">sign in</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

//----------------------------------------------------

// import Image from "next/image";
// import React from "react";
// import signupImage from "../../../../public/signup.svg";
// import Button from "@/components/ui/Button";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { increment } from "@/store/features/auth/authSlice";

// function SignUp() {
//   const router = useRouter();
//   return (
//     <div className="grid md:grid-cols-2 h-[100dvh]">
//       <div className="grid-cols-1 bg-gray-200">
//         <div className="flex flex-col items-center justify-center h-[35dvh] md:h-[100dvh]">
//           <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem] hidden md:block">
//             Sign Up
//           </h1>
//           <Image className="md:w-[50rem] w-[30rem] " src={signupImage} alt="" />
//         </div>
//       </div>
//       <div className="grid-cols-1">
//         <div className="flex flex-col items-center md:justify-center md:h-[100dvh] mb-[2rem] md:mb-0">
//           <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0">
//             Create an account
//           </h1>
//           <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px[1rem]">
//             Enter your contact no below to create your account
//           </p>
//           <input
//             className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] my-[3rem]"
//             type="text"
//             placeholder="Enter contact no"
//           />
//           <Button
//             onClick={() => router.push("signup/otp")}
//             label={"Sign up with contact no."}
//             type="auth"
//           />
//           <p className="mt-[1.5rem] text[1.2rem]">
//             Already have an account?{" "}
//             <span className="font-semibold underline  ml-[1rem]">
//               <Link href="/signin">sign in</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import signupImage from "../../../../public/signup.svg";
// import Button from "@/components/ui/Button";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [user_id, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatedPassword, setRepeatedPassword] = useState("");
//   const [name, setName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const route = useRouter();

//   // Generate a unique ID for the new user
//   const userId = uuidv4();
//   useEffect(() => {
//     setUserId(userId);
//   }, [userId]);

//   const handleSignup = async (e) => {
//     if (password !== repeatedPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     try {
//       const response = await fetch("/api/auth-user-signup/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_id, name, email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();

//       if (data.success) {
//         alert("Signup successful!");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="grid md:grid-cols-2 h-[100dvh]">
//       <div className="grid-cols-1 bg-gray-200">
//         <div className="flex flex-col items-center justify-center h-[38dvh] md:h-[90dvh]">
//           <h1 className="text-secondary-dark text-[3rem] font-semibold mb-[2rem] hidden md:block">
//             Sign Up
//           </h1>
//           <Image className="md:w-[50rem] w-[30rem]" src={signupImage} alt="" />
//         </div>
//       </div>
//       <div className="grid-cols-1">
//         <div className="flex flex-col items-center md:justify-center md:h-[90dvh] mb-[2rem] md:mb-0">
//           <h1 className="text-secondary text-[3rem] font-semibold mb-[.5rem] mt-[2rem] md:mt-0 line-clamp-3 text-center">
//             Sign Up
//           </h1>
//           <p className="text-gray-600 text-[1.6rem] line-clamp-3 text-center px-[1rem]">
//             Enter your email address and password below to sign up to your
//             account
//           </p>
//           <input
//             className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
//             type="text"
//             placeholder="Enter name"
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] mt-[3rem]"
//             type="text"
//             placeholder="Enter email address"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3rem]">
//             <input
//               className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem]  "
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="absolute top-2 right-0 px-4 py-2"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           <div className="relative lg:w-[48rem] md:w-[35rem] w-[30rem] mt-[3rem] mb-[5rem]">
//             <input
//               className="lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] rounded-[1rem] border-2 border-secondary px-[1rem] "
//               type={showRepeatedPassword ? "text" : "password"}
//               placeholder="Confirm password"
//               onChange={(e) => setRepeatedPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="absolute top-2 right-0 px-4 py-2"
//               onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
//             >
//               {showRepeatedPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           <Button onClick={handleSignup} label={"Sign up"} type="auth" />
//           <p className="mt-[1.5rem] text[1.2rem]">
//             Signin with Google?
//             <span className="font-semibold underline ml-[1rem]">
//               <Link href="/signin">sign in</Link>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignIn;
