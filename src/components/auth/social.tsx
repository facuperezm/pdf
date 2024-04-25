"use client";

import { Button } from "@/components/ui/button";
import { MailCheck, Github } from "lucide-react";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <Github className="size-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <MailCheck className="size-5" />
      </Button>
    </div>
  );
}
