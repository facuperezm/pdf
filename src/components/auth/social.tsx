"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Social() {
  async function onClick(provider: string) {
    "use server";
    await signIn(provider);
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("")}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("")}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
}
