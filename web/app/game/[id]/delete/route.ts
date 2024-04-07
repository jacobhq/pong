import {delGame} from "@/lib/queries";
import {redirect} from "next/navigation";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, {params}: { params: { id: string } }) {
    await delGame(params.id).catch((err) => {
        console.error(err)
        throw err
    })

    redirect("/")
}