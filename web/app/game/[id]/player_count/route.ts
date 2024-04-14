import { playerCount } from "@/lib/queries"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    const data = await playerCount(params.id)
    const count = data[0].count

    return Response.json({ playerCount: count })
}