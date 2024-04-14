import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { playerCount, setGameState } from "@/lib/queries";
import { PlayerCount } from "./player-count";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export async function Lobby({ id }: { id: string }) {
    const initialCount = await playerCount(id)

    async function startGame() {
        "use server"
        setGameState(id, "ongoing")
        return redirect(`/game/${id}`)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full space-y-4">
            <Card className="w-full max-w-4xl">
                <CardContent className="p-0">
                    <div className="flex items-center justify-center space-x-4 my-10">
                        <div className="text-9xl font-mono font-semibold tracking-tighter">{id}</div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full max-w-4xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="grid gap-0.5">
                        <CardTitle className="text-lg font-semibold">Waiting For Players</CardTitle>
                        <CardDescription>Enter the join code into a client...</CardDescription>
                    </div>
                    <form action={startGame} className="flex flex-row m-0 items-center">
                        <Button size="lg" type="submit">
                            Start game
                        </Button>
                    </form>
                </CardHeader>
            </Card>
            <PlayerCount gameId={id} initialCount={initialCount[0].count.toString()} />
        </div>
    )
}
