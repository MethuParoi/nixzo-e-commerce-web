import Hero from "@/components/hero/Hero";
import Categories from "@/components/category/Categories";

import React from 'react'
import { supabaseServerClient } from "../../../utils/supabaseServer";

const HomePage = async () => {
  //get authenticated user info from supabase
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user?.id);

  return (
    <main>
      {/*passing the user_id to the client component --> Hero */}
      <Hero user_id={user?.id} />
      <div className="mt-[-8rem]">
        <Categories />
      </div>
    </main>
  );
};

export default HomePage
