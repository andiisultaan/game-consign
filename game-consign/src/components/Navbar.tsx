import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { handleLogout } from "./utils/logout";

export default function Navbar() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="relative text-xl font-bold text-primary transition-colors duration-300 ease-in-out group">
              GameConsign
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {!token ? (
                <>
                  <Link href="/login">
                    <Button size="sm" className="font-bold">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="border border-black font-bold" variant="outline">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/wishlist" className="text-gray-700 hover:text-primary">
                    Wishlist
                  </Link>
                  <form action={handleLogout}>
                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90" type="submit">
                      Logout
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
