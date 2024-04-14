import { MarketingHero } from "@/components/marketing-hero";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (session?.user) return redirect("/game")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MarketingHero />
    </main>
  );
}
