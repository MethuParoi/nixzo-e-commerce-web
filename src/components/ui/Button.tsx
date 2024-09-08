"use client";
import React, { useState } from "react";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void | string; // Optional onClick prop for button functionality
  href?: string; // Optional href prop for link functionality
  type?:
    | "auth"
    | "auth-transparent"
    | "submit"
    | "reset"
    | "size"
    | "button"
    | "default"
    | "card";
  label: string;
  isActive: boolean;
  disabled?: boolean;
  setActiveButton: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  href,
  type = "button",
  label,
  isActive = false,
  setActiveButton = () => {},
}) => {
  const handleClick = () => {
    if (type === "size") {
      setActiveButton(label);
    }
    if (onClick) {
      onClick();
    }
  };

  let buttonClass = "p-4  font-semibold";

  switch (type) {
    case "auth":
      buttonClass +=
        " lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] bg-accent hover:bg-accent-dark  active:bg-accent text-primary text-white rounded-md";
      break;
    case "auth-transparent":
      buttonClass +=
        " lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] bg-primary-light hover:bg-primary-dark  active:bg-accent text-secondary-light  rounded-md border-2 border-gray-300 shadow-md";
      break;
    case "submit":
      buttonClass += " bg-green-500 hover:bg-green-600 text-white rounded-md";
      break;
    case "reset":
      buttonClass += " bg-red-500 hover:bg-red-600 text-white rounded-md";
      break;
    case "size":
      buttonClass += isActive
        ? " bg-red-500 text-primary-light text-[1.8rem] font-normal w-[7rem] border-2 border-gray-300 rounded-[2rem] py-2 px-3"
        : " bg-transparent hover:bg-red-500 active:bg-red-500 hover:text-primary-light text-secondary-light text-[1.8rem] font-normal w-[7rem] border-2 border-gray-300 rounded-[2rem] py-2 px-3";
      break;
    case "button":
      buttonClass += " bg-blue-500 hover:bg-blue-600 text-white rounded-md";
      break;
    case "card":
      buttonClass +=
        " bg-transparent hover:bg-gray-600 hover:text-gray-50 text-gray-600 border-2 border-gray-600 rounded-md";
      break;
    case "default":
      buttonClass += " bg-gray-500 hover:bg-gray-600 text-gray-50 rounded-md";
      break;
  }

  if (href) {
    return (
      <Link href={href} passHref>
        <a
          onClick={onClick}
          className={buttonClass}
          aria-label={label} // Add aria-label for accessibility
        >
          {label}
        </a>
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type={
        type === "submit" ? "submit" : type === "reset" ? "reset" : "button"
      }
      className={buttonClass}
      aria-label={label} // Add aria-label for accessibility
    >
      {label}
    </button>
  );
};

export default Button;

// import React from "react";

// interface ButtonProps {
//   onClick: () => void;
//   type?: "auth" | "submit" | "reset" | "button";
//   label: string;
// }

// const Button: React.FC<ButtonProps> = ({ onClick, type, label }) => {
//   if (type === "auth") {
//     return (
//       <div>
//         <button
//           onClick={onClick}
//           className="lg:w-[50rem] h-[4.5rem] rounded-[1rem] ml-[-2px] bg-accent hover:bg-accent-dark hover:text-primary-dark text-primary text-md rounded-r-[1rem]"
//         >
//           {label}
//         </button>
//       </div>
//     );
//   }
// };

// export default Button;
