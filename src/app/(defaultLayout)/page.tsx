import Hero from "@/components/hero/Hero";
import Categories from "@/components/category/Categories";

import React from 'react'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <div className="mt-[-8rem]">
        <Categories />
      </div>
    </main>
  );
}

export default HomePage
