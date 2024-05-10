import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginButton from "@/app/(auth)/_components/login-button";
import Link from "next/link";
import { LayoutDashboard, LogOut } from "lucide-react";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

export default async function SiteHeader() {
  const session = await auth();

  const initials = `${session?.user.name?.charAt(0) ?? "A"} ${
    session?.user.name?.charAt(1) ?? "I"
  }`;

  return (
    <header className="w-full">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative size-8 rounded-full"
                  >
                    <Avatar className="size-8">
                      {/* <AvatarImage
                        src={session?.user.image ?? ""}
                        alt={session?.user.name ?? "undentified user"}
                      /> */}
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user.name}
                      </p>
                      <p className="text-sm leading-none text-muted-foreground truncate">
                        {session?.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <LayoutDashboard className="size-4 mr-2" aria-hidden />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      action={async (formData) => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button type="submit" className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Logout{" "}
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginButton>
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </LoginButton>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
