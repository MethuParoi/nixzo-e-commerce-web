"use client";

import React, { use, useEffect, useState } from "react";
import Button from "../ui/Button";

function SizeButtons({ setSelectedSize, selectedSize }) {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSize) {
      setActiveButton(selectedSize);
    }
  }, [selectedSize]);

  const handleClick = (label: string) => {
    setActiveButton(label);
    if (setSelectedSize) {
      setSelectedSize(label); // Update the selected size
    }
    // console.log("Size selected:", label);
  };

  return (
    <div className="flex items-center gap-x-5">
      <Button
        label="M"
        type="size"
        onClick={() => handleClick("M")}
        isActive={activeButton === "M"}
        setActiveButton={setSelectedSize}
      />
      <Button
        label="L"
        type="size"
        onClick={() => handleClick("L")}
        isActive={activeButton === "L"}
        setActiveButton={setSelectedSize}
      />
      <Button
        label="XL"
        type="size"
        onClick={() => {
          handleClick("XL");
        }}
        isActive={activeButton === "XL"}
        setActiveButton={setSelectedSize}
      />
      <Button
        label="XXL"
        type="size"
        onClick={() => {
          handleClick("XXL");
        }}
        isActive={activeButton === "XXL"}
        setActiveButton={setSelectedSize}
      />
    </div>
  );
}

export default SizeButtons;

//--------------------------------------------

// "use client";

// import React, { use, useEffect, useState } from "react";
// import Button from "../ui/Button";
// import { useDispatch, useSelector } from "react-redux";
// // import { setSize } from "@/store/features/checkout/checkout";

// function SizeButtons({ setSelectedSize, selectedSize }) {
//   const [activeButton, setActiveButton] = useState<string | null>(null);

//   useEffect(() => {
//     if (selectedSize) {
//       setActiveButton(selectedSize);
//     }
//   }, [selectedSize]);

//   const handleClick = (label: string) => {
//     setActiveButton(label);
//     if (setSelectedSize) {
//       setSelectedSize(label); // Update the selected size
//     }
//     console.log("Size selected:", label);
//   };

//   return (
//     <div className="flex items-center gap-x-5">
//       <Button
//         label="M"
//         type="size"
//         onClick={() => handleClick("M")}
//         isActive={activeButton === "M"}
//         setActiveButton={function (label: string): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       <Button
//         label="L"
//         type="size"
//         onClick={() => handleClick("L")}
//         isActive={activeButton === "L"}
//         setActiveButton={function (label: string): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       <Button
//         label="XL"
//         type="size"
//         onClick={() => handleClick("XL")}
//         isActive={activeButton === "XL"}
//         setActiveButton={function (label: string): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       <Button
//         label="XXL"
//         type="size"
//         onClick={() => handleClick("XXL")}
//         isActive={activeButton === "XXL"}
//         setActiveButton={function (label: string): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//     </div>
//   );
// }

// export default SizeButtons;
