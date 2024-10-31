import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Game Consign",
  description: "e-commerce for gamer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-mono antialiased", robotoMono.variable)}>{children}</body>
    </html>
  );
}
