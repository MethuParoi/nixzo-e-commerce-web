import supabase from "../supabase";

export default async function adminAuth(req, res) {
  //   const { user } = await supabase.auth.api.getUserByCookie(req);

  //   if (!user) {
  //     return res.status(401).json({ error: "Unauthenticated" });
  //   }

  let { data, error } = await supabase
    .from("admin_table")
    .select("admin_contact")
    .select("admin_password");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(403).json({ error: "Forbidden" });
  }
  console.log(data);

  //   return res.status(200).json({ data });
}
