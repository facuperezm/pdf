"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/utils/schemas";
import * as z from "zod";

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
