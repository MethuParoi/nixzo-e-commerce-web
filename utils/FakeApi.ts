// import supabase from "./supabase";

async function getAllProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;

  //   const { data, error } = await supabase.from("products").select("*");
  //   if (error) {
  //     console.error(error);
  //     throw new Error("An error occurred while fetching cabins");
  //   }

  //   return data;
}

export default getAllProducts;
