"use client";

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { MailCheck, Github } from "lucide-react";

export default function Social() {
  function onClick(provider: "google" | "github") {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <Github className="size-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("github")}
      >
        <MailCheck className="size-5" />
      </Button>
    </div>
  );
}
