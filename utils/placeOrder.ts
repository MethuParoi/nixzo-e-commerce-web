import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function placeOrder({
  First_name,
  Last_name,
  Street_address,
  Town_City,
  District,
  Mobile_number,
  Email,
}) {
  const { data, error } = await supabase
    .from("order_table")
    .insert([
      {
        "First name": First_name,
        "Last name": Last_name,
        "Street address": Street_address,
        "Town/City": Town_City,
        District: District,
        "Mobile number": Mobile_number,
        Email: Email,
      },
    ])
    .select();

  if (error) {
    console.error("Error placing order:", error);
  } else {
    console.log("Order placed successfully:", data);
  }
}

export async function getOrders() {
  const { data, error } = await supabase.from("order_table").select("*");

  //   const orders = client
  //     .channel("custom-all-channel")
  //     .on(
  //       "postgres_changes",
  //       { event: "*", schema: "public", table: "order_table" },
  //       (payload) => {
  //         console.log("Received event", payload);
  //         messages.value.push(payload.new);
  //       }
  //     )
  //     .subscribe();

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}
