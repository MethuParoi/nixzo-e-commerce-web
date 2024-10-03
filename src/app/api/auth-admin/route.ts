import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  // if (req.method !== "POST") {
  //   console.log("Method not allowed");
  //   return res.status(405).json({ message: "Method not allowed" });
  // }

  const { contact, password } = await req.json();

  // Fetch the user from the database
  const { data: user, error } = await supabase
    .from("admin_table")
    .select("*")
    .eq("admin_contact", contact)
    .eq("admin_password", password)
    .single();

  // If successful
  if (!error || user) {
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: "admin",
    });
  }

  if (error || !user) {
    return NextResponse.json({
      success: false,
      message: "Invalid username or password",
    });
  }

  // Check the password
  // if (password !== user.password) {
  //   return NextResponse.json({
  //     success: false,
  //     message: "Invalid username or password",
  //   });
  // }
}
