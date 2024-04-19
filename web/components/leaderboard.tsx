import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { PlayerCount } from "./player-count";
import { getTopFivePlayers, playerCount } from "@/lib/queries";
import { LeaderboardRanking } from "./leaderboard-ranking";

export async function Leaderboard({ id }: { id: string }) {
    const initialCount = await playerCount(id)
    const rawPlayers = await getTopFivePlayers(id)
    const gradedPlayers = rawPlayers.map((item) => ({ ...item, grading: Math.round(item.playerScore / (item.modelScore + item.playerScore) * 1000) / 1000 }));
    gradedPlayers.sort((a,b) => -1 * (a.grading - b.grading));
    const players = gradedPlayers.map((item, index) => ({ ...item, index }));


    return (
        <div className="flex flex-col items-center justify-center h-screen w-full space-y-4">
            <Card className="w-full max-w-4xl">
                <CardHeader className="flex flex-row items-between space-x-2 justify-between">
                    <div className="grid gap-0.5">
                        <CardTitle className="text-lg font-semibold">Realtime Leaderboard</CardTitle>
                        <CardDescription>Top performers and their scores</CardDescription>
                    </div>
                    <div className="flex flex-row ml-auto items-center space-x-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline"
                                    className="flex items-center border border-dashed rounded-lg p-4 justify-center">
                                    <div className="text-3xl font-mono font-semibold tracking-tighter">{id}</div>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Join with a code</DialogTitle>
                                    <DialogDescription>
                                        Enter this code on player devices to join.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center justify-center space-x-4 my-10">
                                    <div className="text-9xl font-mono font-semibold tracking-tighter">{id}</div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex flex-col w-full text-sm font-medium grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        <LeaderboardRanking id={id} initialPlayers={players} />
                    </div>
                </CardContent>
            </Card>
            <PlayerCount gameId={id} initialCount={initialCount[0].count.toString()} />
        </div>
    )
}
