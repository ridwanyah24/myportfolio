import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Nav from "@/components/navigation";
import { Providers } from "../provider";

// const geistSans = localFont({
//   src: "@fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//     src: "@fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
//   });
  
export const metadata: Metadata = {
  title: "RidwanDev portfolio",
  description: "Get to know more about me",
  icons: "/letter-r.png"
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Providers >
         <Nav/>
         {children}
      </Providers>
  );
}