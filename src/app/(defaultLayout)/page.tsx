import Hero from "@/components/hero/Hero";
import Categories from "@/components/category/Categories";
import ShopByCategory from "@/components/home/ShopByCategory";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <div className="mt-[-8.1rem]">
        <Categories />
        <ShopByCategory />
      </div>
    </main>
  );
};

export default HomePage
