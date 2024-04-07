import {JoinCode} from "@/components/join-code";
import {getGame} from "@/lib/queries";
import { notFound } from 'next/navigation'
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export default async function ShowCode({params}: { params: { id: string } }) {
    const session = (await getServerSession(authOptions)) || {};
    const game = await getGame(params.id, session.user.id as string);

    if (!game) return notFound()

    return <>
        <JoinCode game={game}/>
    </>
}