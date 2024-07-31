import React from "react";

interface ButtonProps {
  onClick: () => void;
  type?: "auth" | "submit" | "reset";
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, label }) => {
  if (type === "auth") {
    return (
      <div>
        <button
          onClick={onClick}
          className="lg:w-[50rem] h-[4.5rem] rounded-[1rem] ml-[-2px] bg-secondary hover:bg-secondary-dark hover:text-primary-dark text-primary text-md rounded-r-[1rem]"
        >
          {label}
        </button>
      </div>
    );
  }
};

export default Button;
