import GitHub from "next-auth/providers/github";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Resend({
    apiKey: process.env.AUTH_RESEND_KEY,
    from: "no-reply@facupm.dev",
  }),
  Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
  GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const AuthConfig = {
  adapter: DrizzleAdapter(db),
  providers,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut, signIn } = NextAuth(AuthConfig);
