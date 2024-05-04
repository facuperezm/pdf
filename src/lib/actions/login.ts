"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/validations";
import { AuthError } from "next-auth";
import * as z from "zod";

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  try {
    await signIn("resend", { email, callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Something went wrong!" };
    }
  }
  return { success: "Check your email!" };
}
