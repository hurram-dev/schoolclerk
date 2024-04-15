import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBarMenu from "@/components/sidebar/sidebar-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchoolClerk",
  description: "SchoolClerk - School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <SideBarMenu />
        <main className="float-right p-2 w-[80%]">{children}</main>
      </body>
    </html>
  );
}
