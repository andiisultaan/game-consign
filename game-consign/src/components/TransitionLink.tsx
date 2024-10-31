"use client";

import Link, { LinkProps } from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({ children, href, ...props }) => {
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isTransitioning) {
      document.documentElement.classList.remove("hide-scrollbar");
      document.body.classList.remove("page-transition");
    }
  }, [isTransitioning]);

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsTransitioning(true);
    const body = document.querySelector("body");
    document.body.classList.add("hide-scrollbar");
    document.body.classList.add("page-transition");

    await sleep(500);
    router.push(href);
    await sleep(500);

    body?.classList.remove("hide-scrollbar");
    body?.classList.remove("page-transition");
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
