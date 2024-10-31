"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientLottieReact from "@/components/lottie-client/ClientLottie";
import img from "@/animations/cat.json";
import bgImg from "@/animations/background.json";
import { handleLogin } from "./action";
import { TransitionLink } from "@/components/TransitionLink";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { Toaster } from "sonner";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-400 p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <ClientLottieReact animationData={bgImg} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 z-5">
        <ClientLottieReact animationData={img} className="h-12 w-12" />
      </div>
      <Toaster richColors />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6 z-10">
        <div className="text-center">
          <Suspense fallback={<div>Loading...</div>}>
            <ClientFlashComponent />
          </Suspense>
          <h2 className="text-3xl font-bold text-primary">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <span className="text-black hover:text-gray-700 font-semibold">
              <TransitionLink href="/register">Create an account</TransitionLink>
            </span>
          </p>
        </div>

        <form className="space-y-4" action={handleLogin}>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input id="email" name="email" type="email" required className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input id="password" name="password" type="password" required className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary" />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
