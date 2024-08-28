import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products_table").select("*");
  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching products");
  }

  return data;
}

//createProduct and Edit Product function
export async function createProduct(newProduct, id) {
  const hasImagePath = newProduct.image?.startsWith?.(supabaseUrl);

  //generating the image URL for supabase bucket
  const imageName = hasImagePath
    ? newProduct.image.split("/").pop()
    : `${Math.floor(Math.random() * 1000)}-${newProduct.image.name}`.replaceAll(
        "/",
        ""
      );
  //   const imageName = `${Math.floor(Math.random() * 1000)}-${
  //     newProduct.image.name
  //   }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newProduct.image
    : `${supabaseUrl}/storage/v1/object/public/product_images/${imageName}`;

  let query = supabase.from("products_table");
  let data, error;

  //create a new product
  if (!id) {
    ({ data, error } = await query
      .insert([{ ...newProduct, image: imagePath }])
      .select()
      .single());
  }

  //edit
  if (id) {
    ({ data, error } = await query
      .update({ ...newProduct, image: imagePath })
      .eq("product_id", id)
      .select()
      .single());
  }

  // //create
  // if (!id) {
  //   query = query.insert([{ ...newCabin, image: imagePath }]);
  // }

  // //edit
  // if (id) {
  //   query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  // }

  if (error) {
    console.error(error);
    throw new Error("An error occurred while creating the Product");
  }

  //uploading the image to the supabase bucket
  if (hasImagePath) return data;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("product_images")
    .upload(imageName, newProduct.image);

  //if there is an error uploading the image, delete the product
  if (uploadError) {
    console.error(uploadError);
    await supabase.from("products_table").delete().eq("id", data.id);
    throw new Error("An error occurred while uploading the image");
  }

  return data;
}

export async function deleteProduct(id) {
  // Fetch the product to get the image path before deleting it
  const { data: product, error: fetchError } = await supabase
    .from("products_table")
    .select("image")
    .eq("product_id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("An error occurred while fetching the product");
  }

  // Delete the product from the database
  const { error: deleteError } = await supabase
    .from("products_table")
    .delete()
    .eq("product_id", id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error("An error occurred while deleting the product");
  }

  // If the product had an associated image, delete it from the Supabase storage
  if (product?.image) {
    const imageName = product.image.split("/").pop(); // Extract the image name from the URL

    const { error: storageError } = await supabase.storage
      .from("product_images")
      .remove([imageName]);

    if (storageError) {
      console.error(storageError);
      throw new Error("An error occurred while deleting the product image");
    }
  }
  //   const { error } = await supabase.from("products_table").delete().eq("id", id);
  //   if (error) {
  //     console.error(error);
  //     throw new Error("An error occurred while deleting the product");
  //   }
}
