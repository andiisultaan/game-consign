"use client";

import { useRouter } from "next/navigation";
import { addWishlist } from "@/app/wishlist/action";
import { Button } from "./ui/button";

const AddToWishlistBtn = ({ productId }: { productId: string }) => {
  const router = useRouter();
  async function addToWishlist(productId: string) {
    try {
      await addWishlist(productId);
      router.push("/wishlist");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => addToWishlist(productId)}>
        Add to Wishlist
      </Button>
    </>
  );
};

export default AddToWishlistBtn;
