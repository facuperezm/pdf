import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PDF reader with AI",
  description: "Read PDFs with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <Toaster />

        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-50 to-lime-100",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}
