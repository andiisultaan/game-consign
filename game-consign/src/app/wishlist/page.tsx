import Navbar from "@/components/Navbar";
import { getData } from "./action";
import Link from "next/link";
import { formatPrice } from "@/components/utils/formatPrice";
import RemoveFromWishlistButton from "@/components/RemoveFromWishlistButton";
import { ShoppingCart, Heart } from "lucide-react";

const Wishlist = async () => {
  const wishlists = await getData();

  return (
    <section className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        {wishlists && wishlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlists.map(wishlist => (
              <div key={wishlist._id.toString()} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <Link href={`/products/${wishlist.Product.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={wishlist.Product.thumbnail} alt={wishlist.Product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <Heart className="text-red-500 fill-current" size={24} />
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${wishlist.Product.slug}`}>
                    <h2 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors duration-200">{wishlist.Product.name.length > 40 ? wishlist.Product.name.slice(0, 40) + "..." : wishlist.Product.name}</h2>
                  </Link>
                  <p className="text-xl font-bold text-gray-800 mb-4">{formatPrice(wishlist.Product.price)}</p>
                  <div className="flex justify-between items-center">
                    <RemoveFromWishlistButton wishlistId={wishlist._id.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Explore our products and add some items to your wishlist!</p>
            <Link href="/products" className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors duration-200">
              Explore Products
            </Link>
          </div>
        )}
      </main>
    </section>
  );
};

export default Wishlist;
