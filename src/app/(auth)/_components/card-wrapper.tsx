"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/app/(auth)/_components/header";
import Social from "@/app/(auth)/_components/social";

interface CardWrapperProps {
  children: React.ReactNode;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="min-w-72 shadow-md">
      <CardHeader>
        <Header />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
    </Card>
  );
}
