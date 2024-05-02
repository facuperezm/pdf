import { auth } from "../auth";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <LoginButton>
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton>

      <div>{JSON.stringify(session, null, 2)}</div>
    </>
  );
}
