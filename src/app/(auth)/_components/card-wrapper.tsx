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
  headerLabel: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
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
