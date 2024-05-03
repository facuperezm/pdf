import LoginForm from "@/app/(auth)/_components/login-form";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="flex flex-col gap-2 text-black">
      <Suspense fallback="Loading...">
        <LoginForm />
      </Suspense>
    </div>
  );
}
