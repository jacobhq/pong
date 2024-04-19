import { getTopFivePlayers } from "@/lib/queries"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    const data = await getTopFivePlayers(params.id)
    const players = data.map((item, index) => ({ index, grading: (item.playerScore / (item.modelScore + item.playerScore)).toFixed(3), ...item }));

    return Response.json(players)
}