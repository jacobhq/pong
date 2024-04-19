import { getTopFivePlayers } from "@/lib/queries"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    const data = await getTopFivePlayers(params.id)
    const players = data.map((item, index) => ({ ...item, index, grading: Math.round(item.playerScore / (item.modelScore + item.playerScore) * 1000) / 1000 }));
    players.sort((a,b) => -1 * (a.grading - b.grading));

    return Response.json(players)
}