import {delGame} from "@/lib/queries";
import {redirect} from "next/navigation";
import {auth} from "@/lib/auth";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, {params}: { params: { id: string } }) {
    const session = await auth()
    if (!session?.user) redirect("/")

    await delGame(params.id, session?.user?.id as string).catch((err) => {
        console.error(err)
        throw err
    })

    redirect("/")
}