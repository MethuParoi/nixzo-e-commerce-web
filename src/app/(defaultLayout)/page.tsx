import Hero from "@/components/hero/Hero";
import Categories from "@/components/category/Categories";

import React from 'react'
import { supabaseServerClient } from "../../../utils/supabaseServer";

const HomePage = () => {
  //get authenticated user info
  async function getUser() {
    const supabase = await supabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user?.id);
  }
  getUser();
  return (
    <main>
      <Hero />
      <div className="mt-[-8rem]">
        <Categories />
      </div>
    </main>
  );
};

export default HomePage
