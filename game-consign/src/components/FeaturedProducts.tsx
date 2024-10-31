import { ProductModel } from "@/db/models/product";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { formatPrice } from "./utils/formatPrice";
import AddToWishlistBtn from "./AddToWishListButton";

const FeaturedProducts = ({ products }: { products: ProductModel[] }) => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => {
              return (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-bold">{product.name.length > 46 ? product.name.slice(0, 45) + "..." : product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/products/${product.slug}`}>
                        <img src={product.thumbnail} alt={product.slug} className="w-full h-48 object-cover mb-4" />
                        <p>{product.excerpt}</p>
                      </Link>
                      <p className="font-bold">{formatPrice(product.price)}</p>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                      <Button className="w-1/2">Add to Chart</Button>
                      <AddToWishlistBtn productId={product._id.toString()} />
                    </CardFooter>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link href={"/products"}>
            <Button variant="outline" className="bg-background/10 border border-black text-black hover:bg-gray-100">
              View all products
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
