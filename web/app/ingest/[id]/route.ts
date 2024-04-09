import {getGame, newPlayer} from "@/lib/queries";
import {notFound} from "next/navigation";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request, {params}: { params: { id: string } }) {
    const body = await request.json()
    const game = await getGame(params.id, undefined, true)
    if (!game) return notFound()
    if (!body.displayName || body.displayName === "") return new Response("Bad request", {
        status: 400
    })

    await newPlayer(params.id, body.displayName)

    return new Response(game.model)
}