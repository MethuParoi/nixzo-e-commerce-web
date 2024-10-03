import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function placeOrder({
  First_name,
  Last_name,
  Street_address,
  Town_City,
  zip_code,
  District,
  Mobile_number,
  Email,
  Total_price,
  Without_discount_price,
  total_price_with_shipping,
  Cart_items,
  shipping_cost,
  account_number,
  transaction_id,
  payment_method,
}) {
  const { data, error } = await supabase
    .from("order_table")
    .insert([
      {
        first_name: First_name,
        last_name: Last_name,
        street_address: Street_address,
        zip_code: zip_code,
        town_city: Town_City,
        district: District,
        mobile_number: Mobile_number,
        email: Email,
        total_price: Total_price,
        without_discount_price: Without_discount_price,
        total_price_with_shipping: total_price_with_shipping,
        ordered_items: Cart_items,
        shipping_cost: shipping_cost,
        account_number: account_number,
        transaction_id: transaction_id,
        payment_method: payment_method,
      },
    ])
    .select();

  if (error) {
    console.error("Error placing order:", error);
    return { success: false, error };
  } else {
    // console.log("Order placed successfully:", data);
    return { success: true, data };
  }
}

export async function getOrders(sortType) {
  const now = new Date();
  const twentyFourHoursAgo = new Date(
    now.getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  const sevenDaysAgo = new Date(
    now.getTime() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const thirtyDaysAgo = new Date(
    now.getTime() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  let data: any[] | null = null;
  let error: any = null;

  if (sortType === "day") {
    ({ data, error } = await supabase
      .from("order_table")
      .select("*")
      .gte("created_at", twentyFourHoursAgo));
  } else if (sortType === "week") {
    ({ data, error } = await supabase
      .from("order_table")
      .select("*")
      .gte("created_at", sevenDaysAgo));
  } else if (sortType === "month") {
    ({ data, error } = await supabase
      .from("order_table")
      .select("*")
      .gte("created_at", thirtyDaysAgo));
  } else {
    ({ data, error } = await supabase.from("order_table").select("*"));
  }

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}
