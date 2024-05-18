import Link from "next/link";
import React from "react";
import UploadButton from "./_components/upload-button";
import { db } from "@/server/db";
import media from "@/server/db/schema/media";

export default async function DashboardPage() {
  const result = await db
    .select({ name: media.name, url: media.url, id: media.id })
    .from(media);

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-4 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl">My Files</h1>
        <UploadButton />
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 divide-y md:grid-cols-2 lg:grid-cols-3">
        {result.map((file) => (
          <li
            key={file.id}
            className="rounded-lg bg-white shadow transition hover:shadow-lg"
          >
            <Link
              href={`/dashboard/${file.id}`}
              className="flex flex-col gap-2"
            >
              <div className="py-6 px-6 flex w-full items-center justify-between space-x-6">
                <div className="flex flex-col text-left truncate">
                  <span className="">{file.name}.pdf</span>
                  <Link
                    href={file.url}
                    className="text-sm text-blue-500 truncate"
                  >
                    {file.url}
                  </Link>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
