import Link from "next/link";
import React from "react";
import UploadButton from "./_components/upload-button";
import { db } from "@/server/db";
import media from "@/server/db/schema/media";

export default async function DashboardPage() {
  const result = await db.select({ url: media.url }).from(media);

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-4 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl">My Files</h1>
        <UploadButton />
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
          <Link href={`/dashboard/1`} className="flex flex-col gap-2">
            <div className="py-6 px-6 flex w-full items-center justify-between space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3"></div>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
