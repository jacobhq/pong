'use server'
import { auth } from "./auth";
import { setGameState } from "./queries";
import { redirect } from "next/navigation";

export async function startGame(id: string) {
    "use server"
    const session = await auth()
    if (!session || !session.user) return

    await setGameState(id, "ongoing")
    return redirect(`/game/${id}`)
}