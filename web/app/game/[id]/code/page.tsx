import {JoinCode} from "@/components/join-code";
import {getGame} from "@/lib/queries";
import { notFound } from 'next/navigation'

export default async function ShowCode({params}: { params: { id: string } }) {
    const game = await getGame(params.id)

    if (!game) return notFound()

    return <>
        <JoinCode game={game}/>
    </>
}