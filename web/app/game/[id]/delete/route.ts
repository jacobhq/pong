import {delGame} from "@/lib/queries";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, {params}: { params: { id: string } }) {
    const session = (await getServerSession(authOptions)) || {};
    if (!session) redirect("/")

    await delGame(params.id, session.user.id).catch((err) => {
        console.error(err)
        throw err
    })

    redirect("/")
}