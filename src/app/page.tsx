import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return <pre className="text-black">{JSON.stringify(session, null, 2)}</pre>;
}
