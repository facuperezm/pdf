import { FigmaLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function MainNav() {
  return (
    <div className="hidden lg:flex lg:w-full ">
      <Link href="/" className="flex items-center space-x-2">
        <FigmaLogoIcon className="size-6" />
        <span className="text-lg font-bold inline-block">pdf-ai</span>
        <span className="sr-only">Home</span>
      </Link>
      <div className="mx-auto">
        <Button variant="ghost">
          <Link href="/pricing">Pricing</Link>
        </Button>
        <Button variant="ghost">
          <Link href="/faq">FAQ</Link>
        </Button>
      </div>
    </div>
  );
}
