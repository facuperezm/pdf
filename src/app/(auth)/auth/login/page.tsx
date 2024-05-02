import { providerMap, signIn } from "@/auth";
import LoginForm from "@/app/(auth)/auth/_components/auth/login-form";

export default async function SignInPage() {
  return (
    <div>
      <LoginForm />
      <div>
        {/* {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id);
            }}
          >
            <button type="submit">
              <span>
                Sign in with {provider.id} {provider.name}
              </span>
            </button>
          </form>
        ))} */}
      </div>
    </div>
  );
}
