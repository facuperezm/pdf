export { auth as middleware } from "@/auth";
import NextAuth from "next-auth";
import { AuthConfig } from "./auth";

export default NextAuth(AuthConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
