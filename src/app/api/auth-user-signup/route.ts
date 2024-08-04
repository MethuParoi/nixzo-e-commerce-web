import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  // if (req.method !== "POST") {
  //   console.log("Method not allowed");
  //   return res.status(405).json({ message: "Method not allowed" });
  // }

  const { name, contact, password } = await req.json();

  // Fetch the user from the database
  const { data: user, error } = await supabase
    .from("user_table")
    .select("*")
    .eq("user_contact", contact)
    .single();

  //   if (error) {
  //     return NextResponse.json({
  //       success: false,
  //       message: "Error fetching user from the database",
  //     });
  //   }

  if (user) {
    return NextResponse.json({
      success: false,
      message: "User already exists",
    });
  }

  const { data, error: insertError } = await supabase
    .from("user_table")
    .insert([
      { user_name: name, user_contact: contact, user_password: password },
    ])
    .select();

  if (insertError) {
    return NextResponse.json({
      success: false,
      message: "Error inserting user into the database",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Signup successful",
    user: "general",
  });

  //   if (!user) {
  //     const { data, error } = await supabase
  //       .from("user_table")
  //       .insert([
  //         { user_name: name, user_contact: contact, user_password: password },
  //       ])
  //       .select();

  //     // If successful
  //     if (!error || data) {
  //       return NextResponse.json({
  //         success: true,
  //         message: "Login successful",
  //         user: "general",
  //       });
  //     }

  //     if (error) {
  //       return NextResponse.json({
  //         success: false,
  //         message: "User already exists or invalid username or password",
  //       });
  //     }
  //   }
}
