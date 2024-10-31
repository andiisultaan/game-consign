"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        description: "Please try again",
      });
    }
  }, [errorMessage]);

  return null;
};

export default ClientFlashComponent;
