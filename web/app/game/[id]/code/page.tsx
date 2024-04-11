import {JoinCode} from "@/components/join-code";
import {getGame} from "@/lib/queries";
import { notFound } from 'next/navigation'
import {auth} from "@/lib/auth"

export default async function ShowCode({params}: { params: { id: string } }) {
    const session = await auth()
    const game = await getGame(params.id, session?.user?.id as string);

    if (!game) return notFound()

    return <>
        <JoinCode game={game}/>
    </>
}