"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientLottieReact from "@/components/lottie-client/ClientLottie";
import img from "@/animations/cat.json";
import bgImg from "@/animations/background.json";
import { useState } from "react";
import { TransitionLink } from "@/components/TransitionLink";
import { handleRegister } from "./action";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

interface FormData {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  error: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function register(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await handleRegister(formData);

      if (response.statusCode === 201) {
        toast.success("Success! Your account has been registered.", {
          description: "Redirecting you to the login page...",
        });
        router.push("/login");
      } else if (response.statusCode === 400) {
        toast.error(response.error || "Registration failed", {
          description: "Please check your information and try again.",
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-400 p-4 overflow-hidden">
      <Toaster richColors />

      <div className="absolute inset-0 w-full h-full">
        <ClientLottieReact animationData={bgImg} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 z-5">
        <ClientLottieReact animationData={img} className="h-12 w-12" />
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 space-y-6 z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">Create account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already registered?{" "}
            <span className="text-black hover:text-gray-700 font-semibold">
              <TransitionLink href="/login">Sign in</TransitionLink>
            </span>
          </p>
        </div>

        <form className="space-y-4" onSubmit={register}>
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary"
              onChange={handleChange}
              value={formData.username || ""}
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input id="name" name="name" type="text" className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary" onChange={handleChange} value={formData.name || ""} />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
              <span className="text-red-500">*</span>
            </Label>
            <Input id="email" name="email" type="email" required className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary" onChange={handleChange} value={formData.email || ""} />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-primary"
              onChange={handleChange}
              value={formData.password || ""}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-red-500">*</span> are required.
          </p>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
