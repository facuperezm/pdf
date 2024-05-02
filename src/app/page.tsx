import { auth } from "@/auth";
import LoginButton from "@/app/(auth)/auth/_components/auth/login-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <LoginButton>
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton>
    </>
  );
}
