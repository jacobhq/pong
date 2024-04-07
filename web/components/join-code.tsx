import {CardTitle, CardDescription, CardContent, CardFooter, Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Game} from "@/lib/types";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export function JoinCode({game}: { game: Game }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-lg mx-auto">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1 pr-8">
                            <CardTitle className="text-lg">Join with a code</CardTitle>
                            <CardDescription>Enter this code on player devices to join.</CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 my-10">
                        <div className="text-9xl font-mono font-semibold tracking-tighter">{game.id}</div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">3 participants have joined
                    </div>
                    <div className="flex items-center space-x-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline">Quit</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your game
                                        and remove its data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <Button variant="destructive" asChild>
                                            <Link href={`/game/${game.id}/delete`}>Quit and delete game</Link>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button>Start game</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
