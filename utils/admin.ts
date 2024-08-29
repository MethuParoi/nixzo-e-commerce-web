import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertAdmin(admin_data) {
  const { admin_contact, admin_password, user_type } = admin_data;

  const { data, error } = await supabase
    .from("admin_table")
    .insert({ admin_contact, admin_password, user_type });

  if (error) {
    console.error(error);
    throw new Error("An error occurred while inserting coupon");
  }
  console.log("Updated coupon data:", data);
  return data;
}

export async function getAdmin() {
  const { data, error } = await supabase.from("admin_table").select("*");
  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching admin");
  }

  return data;
}

export async function deleteAdmin(admin_id) {
  const { error } = await supabase
    .from("admin_table")
    .delete()
    .eq("admin_id", admin_id);
  if (error) {
    console.error(error);
    throw new Error("An error occurred while inserting coupon");
  }
}
