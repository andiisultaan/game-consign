"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/components/utils/formatPrice";
import Link from "next/link";
import Image from "next/image";
import { fetchData } from "./action";
import debounce from "lodash.debounce";
import AddToWishListButton from "@/components/AddToWishListButton";
import loadingSvg from "@/animations/Rolling@1x-1.0s-200px-200px.svg";

type DataJson = {
  createdAt: string;
  description: string;
  excerpt: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  tags: string[];
  thumbnail: string;
  updatedAt: string;
  _id: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<DataJson[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchProducts = async (query: string, page: number) => {
    setLoading(true);
    try {
      const newProducts = await fetchData(query, page);
      setProducts(prev => (page === 1 ? newProducts : [...prev, ...newProducts]));
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((query: string) => {
    setPageNumber(1);
    fetchProducts(query, 1);
  }, 300);

  useEffect(() => {
    fetchProducts(searchQuery, pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Products</h1>
        <div className="mb-8">
          <Input type="text" placeholder="Search products..." className="w-full max-w-sm mx-auto" value={searchQuery} onChange={handleSearchChange} aria-label="Search products" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map((product, index) => (
            <Link href={`/products/${product.slug}`}>
              <Card key={product._id} className="w-full max-w-[250px]" ref={index === products.length - 1 ? lastProductElementRef : null}>
                <CardHeader>
                  <CardTitle className="font-bold text-sm">{product.name.length > 30 ? product.name.slice(0, 29) + "..." : product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative w-full h-32 mb-2">
                      <Image src={product.thumbnail} alt={product.name} fill style={{ objectFit: "cover" }} className="rounded-md" />
                    </div>
                    <p className="text-muted-foreground text-xs line-clamp-2">{product.excerpt}</p>
                  </Link>
                  <p className="font-bold mt-2 text-sm">{formatPrice(product.price)}</p>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button size="sm" className="w-full">
                    Add to Cart
                  </Button>
                  <AddToWishListButton productId={product._id.toString()} />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center">
          {loading && (
            <div className="flex justify-center mt-4">
              <Image src={loadingSvg} alt={"loading"} width={40} height={40} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
