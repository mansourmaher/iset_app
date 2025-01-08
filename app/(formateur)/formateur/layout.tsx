import { Header } from "@/app/_landingPageComponents/Header";
import Navbar from "@/app/_landingPageComponents/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">
      <Navbar />
      <div className="w-screen bg-slate-100">{children}</div>
    </div>
  );
}
