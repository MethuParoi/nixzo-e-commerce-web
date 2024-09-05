"use client";

import React, { use, useEffect, useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setSize } from "@/store/features/checkout/checkout";

function SizeButtons() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const dispatch = useDispatch();

  const size = useSelector((state) => state.checkout.size);
  useEffect(() => {
    if (size) {
      setActiveButton(size);
    }
  }, [size]);

  const handleSetActiveButton = (label: string) => {
    setActiveButton(label);
  };

  const handleClick = (label: string) => {
    // setActiveButton(label);
    dispatch(setSize(label));
    console.log("Size selected:", label);
  };

  return (
    <div className="flex items-center gap-x-5">
      <Button
        label="M"
        type="size"
        onClick={() => handleClick("M")}
        isActive={activeButton === "M"}
        setActiveButton={handleSetActiveButton}
      />
      <Button
        label="L"
        type="size"
        onClick={() => handleClick("L")}
        isActive={activeButton === "L"}
        setActiveButton={handleSetActiveButton}
      />
      <Button
        label="XL"
        type="size"
        onClick={() => handleClick("XL")}
        isActive={activeButton === "XL"}
        setActiveButton={handleSetActiveButton}
      />
      <Button
        label="XXL"
        type="size"
        onClick={() => handleClick("XXL")}
        isActive={activeButton === "XXL"}
        setActiveButton={handleSetActiveButton}
      />
    </div>
  );
}

export default SizeButtons;
