import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("products_table").select("*");
  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching cabins");
  }

  return data;
}

//createCabin and Edit cabin function
export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //generating the image URL for supabase bucket
  const imageName = `${Math.floor(Math.random() * 1000)}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/product_images/${imageName}`;

  let query = supabase.from("products_table");
  let data, error;

  //create a new cabin
  if (!id) {
    ({ data, error } = await query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single());
  }

  //edit
  if (id) {
    ({ data, error } = await query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
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
    throw new Error("An error occurred while creating the cabin");
  }

  //uploading the image to the supabase bucket
  if (hasImagePath) return data;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("product_images")
    .upload(imageName, newCabin.image);

  //if there is an error uploading the image, delete the cabin
  if (uploadError) {
    console.error(uploadError);
    await supabase.from("products_table").delete().eq("id", data.id);
    throw new Error("An error occurred while uploading the image");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("products_table").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the cabin");
  }
}
