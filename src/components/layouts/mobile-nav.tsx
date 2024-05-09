"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 gap-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <FigmaLogoIcon className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent className="pl-1 pr-0" side="left">
        <div className="px-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-bold">pdf-ai</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Separator className="my-4" />
            <Button variant="ghost" className="w-full hover:underline">
              <Link href="/dashboard">Mi cuenta</Link>
            </Button>
            <Button variant="ghost" className="w-full hover:underline">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" className="w-full hover:underline">
              <Link href="/faq">FAQ</Link>
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
