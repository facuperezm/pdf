"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  await signIn("resend", { email: values.email, callbackUrl });
  return { success: "Email sent" };
}
