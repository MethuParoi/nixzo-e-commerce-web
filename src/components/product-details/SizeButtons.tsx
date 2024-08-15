"use client";

import React, { useState } from "react";
import Button from "../ui/Button";

function SizeButtons() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleSetActiveButton = (label: string) => {
    setActiveButton(label);
  };

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="flex items-center gap-x-5">
      <Button
        label="M"
        type="size"
        onClick={handleClick}
        isActive={activeButton === "M"}
        setActiveButton={handleSetActiveButton}
      />
      <Button
        label="L"
        type="size"
        onClick={handleClick}
        isActive={activeButton === "L"}
        setActiveButton={handleSetActiveButton}
      />
      <Button
        label="XL"
        type="size"
        onClick={handleClick}
        isActive={activeButton === "XL"}
        setActiveButton={handleSetActiveButton}
      />
      <Button
        label="XXL"
        type="size"
        onClick={handleClick}
        isActive={activeButton === "XXL"}
        setActiveButton={handleSetActiveButton}
      />
    </div>
  );
}

export default SizeButtons;
