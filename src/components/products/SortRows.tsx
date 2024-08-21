"use client";

import React, { useEffect, useState } from "react";
import SortProducts from "@/components/products/SortProducts";
import getAllProducts from "../../../utils/FakeApi";
import { useSelector } from "react-redux";

function SortRows() {
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
    { label: "men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ];

  // const PriceOptions: Option[] = [
  //   { label: "Less than ৳500", value: "less_500" },
  //   { label: "৳500 - ৳1000", value: "500_1000" },
  //   { label: "৳1000 - ৳1500", value: "1000_1500" },
  //   { label: "৳1500 - ৳2000", value: "1500_2000" },
  //   { label: "More than ৳2000", value: "more_2000" },
  // ];

  // const ColorOptions: Option[] = [
  //   { label: "Red", value: "red" },
  //   { label: "Navey Blue", value: "navey_blue" },
  //   { label: "Green", value: "green" },
  // ];
  return (
    <div>
      <div className="xl:border-b-2 border-gray-300 mr-[2rem] pt-[1rem]">
        <SortProducts label={"Sort by Category"} Options={SOC} />
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

export default SortRows;
