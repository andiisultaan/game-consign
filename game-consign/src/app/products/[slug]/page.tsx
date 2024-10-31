import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ProductModel } from "@/db/models/product";
import { Metadata } from "next";
import AddToWishlistButton from "@/components/AddToWishListButton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type SlugType = {
  slug: string;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await fetch(`${BASE_URL}/api/products/${params.slug}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      slug: params.slug,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ProductModel } = await response.json();
  return {
    title: data.name,
    description: data.description,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function ProductDetail({ params }: { params: SlugType }) {
  const response = await fetch(`${BASE_URL}/api/products/${params.slug}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      slug: params.slug,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ProductModel } = await response.json();

  if (!data) {
    throw new Error("Product not found");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-square mb-4">
            <Image src={data.thumbnail} alt={data.name} fill className="object-cover rounded-lg" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data?.images.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <Image src={image} alt={`${data.name} thumbnail ${index + 1}`} fill className="object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-gray-950" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
          <p className="text-2xl font-bold text-gray-500 mb-4">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.price || 0)}
          </p>
          <p className="mb-6">{data.description}</p>
          <Button className="w-full mb-4">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <AddToWishlistButton productId={data._id.toString()} />

          <Separator className="my-8" />
          <div className="mt-5">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {data.tags &&
                data.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
