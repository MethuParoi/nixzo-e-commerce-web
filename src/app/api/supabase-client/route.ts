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
import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "../../../../utils/supabaseServer";

export async function GET(request: NextRequest) {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return NextResponse.json({ user });
}
