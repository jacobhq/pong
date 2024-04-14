import { Leaderboard } from "@/components/leaderboard";
import { auth } from "@/lib/auth";
import { getGame } from "@/lib/queries";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth()
    if (!session || !session.user) return redirect("/")

    const game = await getGame(params.id, session.user.id as string);
    if (!game) return notFound()
    if (game.state === "lobby") return redirect(`/game/${game.id}/lobby`)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Leaderboard id={params.id} />
        </main>
    );
}
