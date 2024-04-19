import { getTopFivePlayers } from "@/lib/queries"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    const data = await getTopFivePlayers(params.id)
    const gradedPlayers = data.map((item) => ({ ...item, grading: Math.round(item.playerScore / (item.modelScore + item.playerScore) * 1000) / 1000 }));
    gradedPlayers.sort((a,b) => -1 * (a.grading - b.grading));
    const players = gradedPlayers.map((item, index) => ({ ...item, index }));

    return Response.json(players)
}