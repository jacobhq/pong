import { getGame, getPlayer, setScore } from "@/lib/queries";
import { notFound } from "next/navigation";
import { Player, ScoreRes } from "@/lib/types";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request, { params }: { params: { id: string } }) {
    const game = await getGame(params.id, undefined, true)
    if (!game) return notFound()
    const body = await request.json()
    if (!body.playerId || body.playerId === "" || !body.scorer || body.scorer === "" || body.scorer !== "model" && body.scorer !== "player") return new Response("Bad request", {
        status: 400
    })
    const player = await getPlayer(body.playerId)
    if (!player) return new Response("Bad request (player does not exist)", {
        status: 400
    })

    await setScore(player, body.scorer, 1)
    const newPlayer = await getPlayer(body.playerId) as Player

    const res: ScoreRes = {
        player: newPlayer.playerScore,
        model: newPlayer.modelScore
    }

    return new Response(JSON.stringify(res))
}