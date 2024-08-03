import { createBrowserClient } from "@supabase/ssr";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey);

export default supabaseClient;

// export const supabaseBrowserClient = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );
