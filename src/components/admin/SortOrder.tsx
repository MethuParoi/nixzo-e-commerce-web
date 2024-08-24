"use client";

import React, { useEffect, useState } from "react";
import SortProducts from "@/components/products/SortProducts";
import getAllProducts from "../../../utils/FakeApi";
import { useSelector } from "react-redux";

function SortOrder() {
  interface Option {
    label: string;
    value: string;
  }

  const [products, setProducts] = useState([]);

  const selectedCategories = useSelector(
    (state) => state.sortProduct.selectedOptions
  );

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const allProducts = await getAllProducts();
  //     setProducts(allProducts);
  //     setFilteredProducts(allProducts);
  //   }

  //   fetchProducts();
  // }, []);

  // useEffect(() => {
  //   if (selectedCategories.length === 0) {
  //     setFilteredProducts(products);
  //   } else {
  //     setFilteredProducts(
  //       products.filter((product) =>
  //         selectedCategories.includes(product.category)
  //       )
  //     );
  //   }
  // }, [selectedCategories, products]);

  const SOC: Option[] = [
    { label: "last week", value: "last week" },
    { label: "last 15 days", value: "last 15 days" },
    { label: "last one month", value: "last one month" },
  ];

  return (
    <div>
      <div className=" mr-[2rem] pt-[1rem]">
        <SortProducts label={"Sort by time"} Options={SOC} />
      </div>
      {/* <div className="border-b-2 border-gray-300 mr-[2rem] pt-[1rem]">
        <SortProducts label={"Price"} Options={PriceOptions} />
      </div>
      <div className="border-b-2 border-gray-300 mr-[2rem] pt-[1rem]">
        <SortProducts label={"Color"} Options={ColorOptions} />
      </div> */}
    </div>
  );
}

export default SortOrder;
