import {getGame, getPlayer, newPlayer} from "@/lib/queries";
import {notFound} from "next/navigation";
import {JoinRes, Player} from "@/lib/types";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request, {params}: { params: { id: string } }) {
    const body = await request.json()
    const game = await getGame(params.id, undefined, true)
    if (!game) return notFound()
    if (!body.displayName || body.displayName === "") return new Response("Bad request", {
        status: 400
    })

    const createdPlayer = await newPlayer(params.id, body.displayName)
    const player = await getPlayer(createdPlayer) as Player

    const res: JoinRes = {
        gameId: params.id,
        playerId: player.id,
        modelUrl: game.model
    }

    return new Response(JSON.stringify(res))
}