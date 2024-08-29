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
  console.log("Fetched coupon data:", data);
  return data;
}

// async function update() {
//   const { data, error } = await supabase
//     .from("coupon_table")
//     .update({ discount_percent: 20 }) // change just one field
//     .eq("id", 1);

//   console.log("Update result:", data, error);
// }
// update();

export async function upsertCoupon(coupon) {
  const { coupon_code, discount_percent } = coupon;

  const { data, error } = await supabase
    .from("coupon_table")
    .update({ coupon_code, discount_percent })
    .eq("id", 1)
    .select();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while upserting coupon");
  }
  console.log("Updated coupon data:", data);
  return data;
}

// export async function insertCoupon(coupon) {
//   const { data, error } = await supabase.from("coupon_table").insert(coupon);
//   if (error) {
//     console.error(error);
//     throw new Error("An error occurred while inserting coupon");
//   }

//   return data;
// }


// const { data, error } = await supabase
//   .from("coupon_table")
//   .update({ other_column: "otherValue" })
//   .eq("some_column", "someValue")
//   .select();
          
