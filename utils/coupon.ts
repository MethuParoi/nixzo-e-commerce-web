import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCoupon() {
  const { data, error } = await supabase.from("coupon_table").select("*");
  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching coupon");
  }

  return data;
}
