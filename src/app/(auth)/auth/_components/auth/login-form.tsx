"use client";

import CardWrapper from "@/app/(auth)/auth/_components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

import {
  FormLabel,
  FormItem,
  Form,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import FormError from "../../../../../components/form-error";
import FormSuccess from "../../../../../components/form-success";
import { useTransition } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/login";

export default function LoginForm() {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");
    // Call the login server action
    startTransition(async () => {
      await login({ email: data.email }, callbackUrl);
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@email.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
