import {
    MoreHorizontal,
    PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProductNav } from "@/components/product-nav"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getGames } from "@/lib/queries"
import { auth } from "@/lib/auth"

export default async function Dashboard() {
    const session = await auth()
    if (!session || !session.user) return redirect("/")
    const games = await getGames(session.user.id!)

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <ProductNav />
            <div className="flex flex-col gap-4 sm:py-4 min-h-full flex-grow">
                <main className="flex flex-col min-h-full flex-grow items-end space-4 p-4 sm:px-6 sm:py-0 gap-8">
                    <div className="flex items-center">
                        <div className="ml-auto w-full sm:w-auto flex items-center gap-2">
                            <Button size="lg" className="gap-2" asChild>
                                <Link href="/game/new">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    New Game
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <Card className="flex flex-col h-full flex-grow min-w-full justify-between">
                        <CardHeader>
                            <CardTitle>Games</CardTitle>
                            <CardDescription>
                                Manage your games and or create a new one.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mb-auto">
                            {games[0] ? <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Model
                                        </TableHead>
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {games.map((game) => (<TableRow key={game.id}>
                                        <TableCell className="font-medium">
                                            {game.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="capitalize">{game.state}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {game.modelName}
                                        </TableCell>
                                        <TableCell className="flex flex-col md:flex-row space-x-2">
                                            <Button variant="outline" asChild>
                                                <Link href={`/game/${game.id}${game.state === "lobby" ? "/lobby" : ""}`}>{game.state === "lobby" ? "Enter lobby" : "View leaderboard"}</Link>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        className="hidden md:flex"
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>))}
                                </TableBody>
                            </Table> : <div className="flex flex-col items-center justify-center gap-1 text-center min-h-full">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    You have no games
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    You can start selling as soon as you add a product.
                                </p>
                                <Button className="mt-4" variant="outline" asChild>
                                    <Link href="/game/new">New Game</Link>
                                </Button>
                            </div>}
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Showing <strong>all games</strong> linked to your account.
                            </div>
                        </CardFooter>
                    </Card>
                </main>
            </div>
        </div>
    )
}
