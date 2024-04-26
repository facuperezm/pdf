import LoginForm from "@/components/auth/login-form";

export default async function SignInPage() {
  return (
    <div className="flex overflow-hidden relative w-full h-full">
      <LoginForm />
    </div>
  );
}
