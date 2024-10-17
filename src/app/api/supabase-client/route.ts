// import { NextRequest, NextResponse } from "next/server";
// import { supabaseServerClient } from "../../../../utils/supabaseServer";

// export async function GET(request: NextRequest) {
//   const supabase = await supabaseServerClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return NextResponse.json({ user });
// }
//-----------------------------------
// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
