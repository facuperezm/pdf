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
    async sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
    }) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "no-reply@facupm.dev",
          to: email,
          subject: `Sign in to ${new URL(url).host}`,
          html: `<p>To sign in, click <a href="${url}">here</a>.</p>`,
          text: `To sign in, visit ${url}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to send verification email");
    },
  }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
    allowDangerousEmailAccountLinking: true,
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
