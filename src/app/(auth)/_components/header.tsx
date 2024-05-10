import { Paperclip } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full flex flex-col items-center">
      <Paperclip className="size-16 bg-white rounded-full p-4 absolute -translate-y-16 border" />
      <h1 className="text-3xl font-semibold mt-1">pdf-ai</h1>
    </div>
  );
}
