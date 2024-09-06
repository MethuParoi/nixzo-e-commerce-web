import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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

  return NextResponse.json({
    success: true,
    message: "Signup successful",
    user: "general",
  });
}

//V00------------------------------------------

// import { createClient } from "@supabase/supabase-js";
// import { NextRequest, NextResponse } from "next/server";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export async function POST(req: NextRequest) {
//   // if (req.method !== "POST") {
//   //   console.log("Method not allowed");
//   //   return res.status(405).json({ message: "Method not allowed" });
//   // }

//   const { user_id, name, email, password } = await req.json();

//   // Fetch the user from the database
//   const { data: user, error } = await supabase
//     .from("users")
//     .select("email")
//     .eq("email", email)
//     .single();

//   //   if (error) {
//   //     return NextResponse.json({
//   //       success: false,
//   //       message: "Error fetching user from the database",
//   //     });
//   //   }

//   if (user) {
//     return NextResponse.json({
//       success: false,
//       message: "User already exists",
//       user: user,
//     });
//   }

//   const { data, error: insertError } = await supabase
//     .from("users")
//     .insert([
//       { id: user_id, full_name: name, email: email, password: password },
//     ])
//     .select();

//   if (insertError) {
//     return NextResponse.json({
//       success: false,
//       message: "Error inserting user into the database",
//       insertError: insertError,
//     });
//   }

//   return NextResponse.json({
//     success: true,
//     message: "Signup successful",
//     user: "general",
//   });

//   //   if (!user) {
//   //     const { data, error } = await supabase
//   //       .from("user_table")
//   //       .insert([
//   //         { user_name: name, user_contact: contact, user_password: password },
//   //       ])
//   //       .select();

//   //     // If successful
//   //     if (!error || data) {
//   //       return NextResponse.json({
//   //         success: true,
//   //         message: "Login successful",
//   //         user: "general",
//   //       });
//   //     }

//   //     if (error) {
//   //       return NextResponse.json({
//   //         success: false,
//   //         message: "User already exists or invalid username or password",
//   //       });
//   //     }
//   //   }
// }

//--------------------V02---------------------------------------------------

// import { createClient } from "@supabase/supabase-js";
// import { NextRequest, NextResponse } from "next/server";

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export async function POST(req: NextRequest) {
//   const { user_id, name, email, password } = await req.json();

//   // Check if the user already exists
//   const { data: user, error } = await supabase
//     .from("users")
//     .select("email")
//     .eq("email", email)
//     .single();

//   if (user) {
//     return NextResponse.json({
//       success: false,
//       message: "User already exists",
//       user: user,
//     });
//   }

//   // Create the user in the auth.users table
//   const { data: authUser, error: authError } = await supabase.auth.signUp({
//     email: email,
//     password: password,
//   });

//   if (authError) {
//     return NextResponse.json({
//       success: false,
//       message: "Error creating user in auth.users",
//       authError: authError,
//     });
//   }

//   // Insert the user into the users table
//   const { data, error: insertError } = await supabase
//     .from("users")
//     .insert([
//       {
//         id: authUser.user.id,
//         full_name: name,
//         email: email,
//         password: password,
//       },
//     ])
//     .select();

//   if (insertError) {
//     return NextResponse.json({
//       success: false,
//       message: "Error inserting user into the database",
//       insertError: insertError,
//     });
//   }

//   return NextResponse.json({
//     success: true,
//     message: "Signup successful",
//     user: "general",
//   });
// }
