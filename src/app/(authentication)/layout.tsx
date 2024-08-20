"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      {/* <html lang="en">
        <body> */}
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* </body>
      </html> */}
    </StoreProvider>
  );
}
