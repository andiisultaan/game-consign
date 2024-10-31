"use client";

import React from "react";
import { Button } from "./ui/button";
import { deleteWishlist } from "../app/wishlist/action";

const RemoveFromWishlistBtn = ({ wishlistId }: { wishlistId: string }) => {
  async function handleRemoveFromWishlistBtn() {
    try {
      await deleteWishlist(wishlistId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Button variant="outline" onClick={() => handleRemoveFromWishlistBtn()}>
        Remove from Wishlist
      </Button>
    </div>
  );
};

export default RemoveFromWishlistBtn;
