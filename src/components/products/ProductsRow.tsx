"use client";
import React, { useEffect, useState } from "react";
import getAllProducts from "../../../utils/FakeApi";
import ProductCard from "./ProductCard";

function ProductsRow() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[1rem] md:gap-x-40 gap-y-20 mx-auto max-w-screen-2xl">
        {products &&
          products.map((product) => (
            <ProductCard
              // key={product.product_id}
              key={product.id} // for fake api only
              // product_id={product.product_id}
              img={product.image}
              category={product.category}
              title={product.title}
              price={product.price}
              description={product.description}
              rating={product.rating.rate}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductsRow;
