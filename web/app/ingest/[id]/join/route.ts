import { getGame, getModelUrl, newPlayer } from "@/lib/queries";
import { notFound } from "next/navigation";
import { JoinRes } from "@/lib/types";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json()
    const game = await getGame(params.id, undefined, true)
    if (!game) return notFound()
    if (!body.displayName || body.displayName === "") return new Response("Bad request", {
        status: 400
    })

    const playerId = await newPlayer(params.id, body.displayName)

    const modelUrl = await getModelUrl(game.modelName) as string

    const res: JoinRes = {
        gameId: params.id,
        playerId: playerId,
        modelUrl: modelUrl
    }

    return new Response(JSON.stringify(res))
}