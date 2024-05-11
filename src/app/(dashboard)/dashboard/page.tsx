import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-4 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl">My Files</h1>
        {/* <FileUploader /> */}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
          <Link href={`/dashboard/1`} className="flex flex-col gap-2">
            <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate">test</h3>
                </div>
              </div>
            </div>
          </Link>

          <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-2 gap-6 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              1/1/22
            </div>

            <Button size="sm" className="w-full" variant="destructive"></Button>
          </div>
        </li>
      </ul>
    </main>
  );
}
