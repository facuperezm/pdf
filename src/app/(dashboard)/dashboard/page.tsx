"use client";

import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-4 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl">My Files</h1>
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
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
          <Link href={`/dashboard/1`} className="flex flex-col gap-2">
            <div className="py-6 px-6 flex w-full items-center justify-between space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate">test</h3>
                </div>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </main>
  );
}
