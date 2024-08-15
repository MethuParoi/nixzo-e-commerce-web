import React from "react";
import SortProducts from "@/components/products/SortProducts";
import Loader from "../ui/Loader/Loader";

function SortRows() {
  interface Option {
    label: string;
    value: string;
  }

  const PriceOptions: Option[] = [
    { label: "Less than ৳500", value: "less_500" },
    { label: "৳500 - ৳1000", value: "500_1000" },
    { label: "৳1000 - ৳1500", value: "1000_1500" },
    { label: "৳1500 - ৳2000", value: "1500_2000" },
    { label: "More than ৳2000", value: "more_2000" },
  ];

  const ColorOptions: Option[] = [
    { label: "Red", value: "red" },
    { label: "Navey Blue", value: "navey_blue" },
    { label: "Green", value: "green" },
  ];
  return (
    <div>
      {/* <div>
        <Loader />
      </div> */}
      <div className="border-b-2 border-gray-300 mr-[2rem] pt-[1rem]">
        <SortProducts label={"Price"} Options={PriceOptions} />
      </div>
      <div className="border-b-2 border-gray-300 mr-[2rem] pt-[1rem]">
        <SortProducts label={"Color"} Options={ColorOptions} />
      </div>
    </div>
  );
}

export default SortRows;
