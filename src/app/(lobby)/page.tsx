import LoginButton from "@/app/(auth)/_components/login-button";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <Shell className="gap-10 md:gap-14">
      <main className="flex justify-center items-center max-w-5xl mx-auto">
        <section className="py-40 flex justify-center flex-col space-y-4">
          <h1 className="text-balance text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Make reading long pdf files easier with AI
          </h1>
          <p className="leading-7 text-center text-lg">
            Upload a PDF file and let our AI summarize it for you
          </p>
        </section>
        <section>
          <div></div>
        </section>
        {/* <LoginButton>
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton> */}
      </main>
    </Shell>
  );
}
