import ClientLottieReact from "./lottie-client/ClientLottie";
import { Button } from "./ui/button";
import img from "../animations/cat.json";
import Link from "next/link";

export default function Banner() {
  return (
    <>
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('https://cdn.dribbble.com/userupload/12257496/file/original-a2cdbf41ad2d01d0c3bf294b15bfa105.png?resize=1024x768')`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" /> {/* Overlay for better text readability */}
        <div className="container relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Level Up Your Gaming Experience</h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">Discover the latest gaming PCs and consoles. Unleash your gaming potential with cutting-edge technology.</p>
            </div>
            <div className="space-x-4">
              <Link href={"/products"}>
                <Button size="lg" variant="outline" className="bg-background/10 text-white hover:bg-background/20 border-white">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 z-5">
          <ClientLottieReact animationData={img} className="h-24 w-24" />
        </div>
      </section>
    </>
  );
}
