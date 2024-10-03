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
  const { name, email, password } = await req.json();

  // Fetch the user from the database
  const { data: user, error } = await supabase
    .from("email_users")
    .select("email")
    .eq("email", email)
    .single();

  if (user) {
    return NextResponse.json({
      success: false,
      message: "User already exists",
      user: user,
    });
  }

  // Insert the user into the users table
  const { data, error: insertError } = await supabase
    .from("email_users")
    .insert([{ name: name, email: email, password: password }])
    .select();

  if (insertError) {
    return NextResponse.json({
      success: false,
      message: "Error inserting user into the database",
      insertError: insertError,
    });
  }

  if (!insertError) {
    // Fetch the user from the database
    const { data: user, error } = await supabase
      .from("email_users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    // If successful
    if (!error || user) {
      return NextResponse.json({
        success: true,
        message: "Signup successful",
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userAvatar: user.avatar_url,
      });
    }
  }

  // return NextResponse.json({
  //   success: true,
  //   message: "Signup successful",
  //   userId: data.id,
  //   userName: data.name,
  //   userEmail: data.email,
  //   userAvatar: data.avatar_url,
  // });
}

