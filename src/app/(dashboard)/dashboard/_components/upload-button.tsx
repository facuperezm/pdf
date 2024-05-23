"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import FileUploader from "@/app/(dashboard)/dashboard/_components/file-uploader";
import { Button } from "@/components/ui/button";
import React from "react";

export default function UploadButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(v) => {
          if (!v) {
            setIsOpen(v);
          }
        }}
      >
        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
          <Button variant="outline">Upload File</Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-lg font-semibold">Upload File</h2>
          <FileUploader />
        </DialogContent>
      </Dialog>
    </>
  );
}
