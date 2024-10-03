"use client";
import React, { useEffect, useState } from "react";
import getAllProducts from "../../../utils/FakeApi";
import ProductCard from "./ProductCard";
import Loader from "../ui/Loader/Loader";
import { useSelector } from "react-redux";

function ProductsRow() {
  interface Product {
    id: number;
    image: string;
    category: string;
    title: string;
    price: number;
    description: string;
    rating: {
      rate: number;
    };
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const selectedCategories = useSelector(
    (state: any) => state.sortProduct.selectedOptions
  );

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(true); // Set error state if fetching fails
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    try {
      if (selectedCategories.length === 0) {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(
          products.filter((product) =>
            selectedCategories.includes(product.category)
          )
        );
      }
    } catch (err) {
      setError(true); // Set error state if filtering fails
    }
  }, [selectedCategories, products]);

  if (error) {
    //automatically reloads
    () => window.location.reload();
    // return (
    //   <div>
    //     <p>An error occurred. Please refresh the page.</p>
    //     <button onClick={() => window.location.reload()}>Refresh</button>
    //   </div>
    // );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (selectedCategories) {
    return (
      <div>
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-[1rem] md:gap-x-40 gap-y-20 mx-auto max-w-screen-2xl">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard
                // key={product.product_id}
                key={product.id}
                product_id={product.id} // for fake api only
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[1rem] md:gap-x-40 gap-y-20 mx-auto max-w-screen-2xl">
        {products &&
          products.map((product) => (
            <ProductCard
              // key={product.product_id}
              key={product.id}
              product_id={product.id} // for fake api only
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
