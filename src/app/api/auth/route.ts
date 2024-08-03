// // pages/api/login.js
// import { createClient } from "@supabase/supabase-js";
// import { NextResponse } from "next/server";
// // import bcrypt from "bcrypt";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default async function POST(req) {
//   const { contact, password } = await req.body;

//   // Fetch the user from the database
//   const { data: user, error } = await supabase
//     .from("admin_table")
//     .select("*")
//     .eq("contact", contact)
//     .single();

//   if (error || !user) {
//     return NextResponse.json({
//       success: false,
//       message: "Invalid username or password",
//     });
//   }

//   // Check the password
//   if (password !== user.password) {
//     return NextResponse.json({
//       success: false,
//       message: "Invalid username or password",
//     });
//   }

//   // If successful
//   return NextResponse.json({ success: true, message: "Login successful" });

//   // NextResponse.json({ message: "Method not allowed" });
// }

//----------------------copilot-------------------------

// pages/api/login.js
// import { createClient } from "@supabase/supabase-js";
// import { NextResponse } from "next/server";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { contact, password } = req.body;

//   // Fetch the user from the database
//   const { data: user, error } = await supabase
//     .from("admin_table")
//     .select("*")
//     .eq("contact", contact)
//     .single();

//   if (error || !user) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid username or password",
//     });
//   }

//   // Check the password
//   if (password !== user.password) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid username or password",
//     });
//   }

//   // If successful
//   return res.status(200).json({ success: true, message: "Login successful" });
// }

//chatgpt

// pages/api/login.js
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

  const { contact, password } = await req.json();

  // Fetch the user from the database
  const { data: user, error } = await supabase
    .from("admin_table")
    .select("*")
    .eq("admin_contact", contact)
    .eq("admin_password", password)
    .single();

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

  // If successful
  return NextResponse.json({ success: true, message: "Login successful" });
}
