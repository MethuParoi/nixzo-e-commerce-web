import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nixzobd",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* mx-auto */}
        <div className="px-5 md:px-0 pt-[1rem] md:pt-[2rem] md:container md:mx-auto xl:max-w-[120rem] 2xl:max-w-[150rem]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}