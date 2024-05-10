import { Shell } from "@/components/shell";

export default async function Home() {
  return (
    <Shell className="gap-10 md:gap-14">
      <main className="flex justify-center items-center max-w-5xl mx-auto">
        <section className="py-40 flex justify-center flex-col space-y-4">
          <h1 className="text-balance text-center scroll-m-20 text-4xl font-bold tracking-tighter lg:text-6xl">
            Make reading <span className="font-extrabold">loooong</span> pdf
            files easier with AI
          </h1>
          <p className="leading-7 text-center text-lg text-balance">
            Upload a PDF file and let our AI summarize it for you
          </p>
        </section>
        <section>
          <div></div>
        </section>
      </main>
    </Shell>
  );
}
