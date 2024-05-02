"use server";

import { signIn } from "@/auth";
import * as z from "zod";
import { LoginSchema } from "@/lib/schemas";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  try {
    await signIn("resend", { email });
  } catch (error) {
    return { error: "Check your email!" };
  }

  return { success: "Check your email!" };
}
