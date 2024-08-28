"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { useRouter } from "next/navigation";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useEffect } from "react";
import ClientProvider from "@/components/redux/ClientProvider";
import AdminNavbar from "@/components/admin/AdminNavbar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Nixzobd",
//   description: "Generated by Next.js",
// };

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const username = typeof user === "string" ? user : user?.user;
  console.log(username);

  if (username !== "admin") {
    return (
      <html lang="en">
        <body>
          <div className="flex flex-col justify-center items-center h-[100dvh]">
            <h1 className="text-[3rem] text-red-500 font-semibold">
              Unauthorized !
            </h1>
            <button onClick={() => router.push("/")}>Bak to home</button>
          </div>
        </body>
      </html>
    );
  }
  return (
    <Provider store={store}>
      <StoreProvider>
        <html lang="en">
          <body>
            {/* mx-auto */}
            <div className="px-5 md:px-0 pt-[1rem] md:pt-[2rem] md:container md:mx-auto xl:max-w-[120rem] 2xl:max-w-[150rem]">
              <AdminNavbar />
              {children}
            </div>
          </body>
        </html>
      </StoreProvider>
    </Provider>
  );
}
