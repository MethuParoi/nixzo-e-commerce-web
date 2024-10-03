import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function setCart(cart, user_id) {
  const { data, error } = await supabase
    .from("users")
    .update({ user_cart: cart })
    .eq("id", user_id);

  if (error) {
    console.error("Error updating cart:", error);
  }
}

export async function setEmailUserCart(cart, user_id) {
  const { data, error } = await supabase
    .from("email_users")
    .update({ user_cart: cart })
    .eq("id", user_id);

  if (error) {
    console.error("Error updating cart:", error);
  }
}

export async function getUserCart(user_id) {
  const { data, error } = await supabase
    .from("users")
    .select("user_cart")
    .eq("id", user_id);

  if (error) {
    console.error("Error fetching cart:", error);
    throw new Error("An error occurred while fetching cart");
  }

  return data;
}

export async function getEmailUserCart(user_id) {
  const { data, error } = await supabase
    .from("email_users")
    .select("user_cart")
    .eq("id", user_id);

  if (error) {
    console.error("Error fetching cart:", error);
    throw new Error("An error occurred while fetching cart");
  }

  return data;
}

// export async function getEmailUserId(email) {
//   const { data, error } = await supabase
//     .from("email_users")
//     .select("id")
//     .eq("email", email);

//   if (error) {
//     console.error("Error fetching user id:", error);
//     throw new Error("An error occurred while fetching user id");
//   }

//   return data;
// }
