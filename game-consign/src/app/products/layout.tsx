import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import DiscountBanner from "@/components/DiscountBanner";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Products | Game Consign",
  description: "Products Game Consign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <DiscountBanner />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <section className={cn("font-sans antialiased", roboto.className)}>{children}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
