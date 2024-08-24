"use client";

import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminNavbar from "@/components/admin/AdminNavbar";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function page() {
  // useEffect(() => {
  //   toast.success("Welcome Admin!", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // }, []);

  return (
    <div>
      <AdminNavbar />
      <AdminDashboard />
    </div>
  );
}

export default page;
