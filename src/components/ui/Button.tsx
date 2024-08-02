import React from "react";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void;
  href?: string; // Optional href prop for link functionality
  type?: "auth" | "submit" | "reset" | "button";
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, href, type = "button", label }) => {
  let buttonClass = "p-4 rounded-md text-white font-semibold";

  switch (type) {
    case "auth":
      buttonClass +=
        " lg:w-[48rem] md:w-[35rem] w-[30rem] h-[4.5rem] bg-accent hover:bg-accent-dark active:bg-accent text-primary";
      break;
    case "submit":
      buttonClass += " bg-green-500 hover:bg-green-600";
      break;
    case "reset":
      buttonClass += " bg-red-500 hover:bg-red-600";
      break;
    case "button":
      buttonClass += " bg-blue-500 hover:bg-blue-600";
      break;
    default:
      buttonClass += " bg-gray-500 hover:bg-gray-600";
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
      onClick={onClick}
      type={type === "submit" ? "submit" : type === "reset" ? "reset" : "button"}
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
