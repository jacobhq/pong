import {Lobby} from "@/components/lobby";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {getGame} from "@/lib/queries";
import {notFound} from "next/navigation";

export default async function Page({params}: { params: { id: string } }) {
    const session = (await getServerSession(authOptions)) || {};
    const game = await getGame(params.id, session.user.id as string);

    if (!game) return notFound()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Lobby id={params.id}/>
        </main>
    );
}
