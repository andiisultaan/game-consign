import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./register.css";
import { cn } from "@/lib/utils";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sign Up | Game Consign",
  description: "Register Game Consign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={cn("font-mono antialiased", robotoMono.variable)}>{children}</section>;
}
