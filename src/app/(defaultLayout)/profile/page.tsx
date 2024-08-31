import React from "react";
import { supabaseServerClient } from "../../../../utils/supabaseServer";

function UserProfile() {
  async function getUser() {
    const supabase = await supabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user?.id);
  }
  getUser();
  return <div>User</div>;
}

export default UserProfile;
