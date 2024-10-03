"use client";

import ProductCard from "@/components/products/ProductCard";
import SearchContext from "@/context-api/searchContext";
import Link from "next/link";
import { useContext } from "react";

function SearchPage() {
  const { filteredProducts: products } = useContext(SearchContext);
  console.log(products);

  if (products.length === 0)
    return (
      <div>
        <h1 className="text-center text-secondary-light text-[2rem] font-semibold mt-10">
          No products found ): Try searching for something else
        </h1>
      </div>
    );
  return (
    <div className="grid grid-cols-5 mt-[4rem] mb-[8rem]">
      <div className="">
        <div className="border-b-2 border-gray-300 mr-[2rem] py-[.5rem]">
          <h1 className="text-[1.8rem] font-semibold">Hot selling items</h1>
        </div>
      </div>
      <div className="col-span-4 mr-[10rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[1rem] md:gap-x-40 gap-y-20 mx-auto max-w-screen-2xl">
          {products &&
            products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
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
                  product_id={undefined}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
