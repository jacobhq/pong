import {CardTitle, CardDescription, CardHeader, CardContent, Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Skeleton} from "@/components/ui/skeleton"

export function Lobby({id}: { id: string }) {
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
                    <div className="flex flex-row m-0 items-center">
                        <Button size="lg">
                            Start game
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">

                </CardContent>
            </Card>
        </div>
    )
}
