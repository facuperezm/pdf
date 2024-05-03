import LoginForm from "@/app/(auth)/_components/login-form";

export default async function LoginPage() {
  return (
    <div className="flex flex-col gap-2 text-black">
      <LoginForm />
    </div>
  );
}
