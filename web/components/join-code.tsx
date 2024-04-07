import {CardTitle, CardDescription, CardContent, CardFooter, Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

export function JoinCode() {
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
                        <div className="text-9xl font-mono font-semibold tracking-tighter">3A6B8C</div>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">3 participants have joined
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button size="sm" variant="outline">
                            Back
                        </Button>
                        <Button size="sm">Start game</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
