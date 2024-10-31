import Banner from "@/components/Banner";
import DiscountBanner from "@/components/DiscountBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getFeaturedProducts, ProductModel } from "@/db/models/product";

export default async function Home() {
  const products: ProductModel[] = await getFeaturedProducts();

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Navbar />
          <DiscountBanner />
          <Banner />
          <DiscountBanner />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <FeaturedProducts products={products} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
