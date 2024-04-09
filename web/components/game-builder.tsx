import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth";
import {authOptions} from "@/lib/auth";
import {generateGameId} from "@/lib/id";
import {Game} from "@/lib/types";
import {getModel, newGame} from "@/lib/queries";
import {redirect} from "next/navigation";

export async function GameBuilder() {
  const session = (await getServerSession(authOptions)) || {};

  async function createGame(rawFormData: FormData) {
    'use server'

    const formData = {
      name: rawFormData.get('name') as string,
      model: rawFormData.get('model') as string,
    }

    const game: Game = {
      id: generateGameId(),
      name: formData.name,
      owner: session ? session.user.id : "",
      model: await getModel(formData.model) as string,
      state: "lobby"
    }

    await newGame(game).catch((err) => {
      console.error(err)
      throw err
    })

    redirect(`/game/${game.id}/code`)
  }


  return (
    <form action={createGame} className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">Create game</CardTitle>
          <CardDescription>Please name your game, and select a model</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Enter the name of the game" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            {/* @ts-ignore */}
            <Input id="owner" value={session ? session?.user?.id : ""} readOnly />
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select defaultValue="@jhqcat/pong-v0.2.1" name="model">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model"/>
                </SelectTrigger>
                <SelectContent className="w-full max-w-xs">
                  <SelectItem value="@jhqcat/pong-v0.2.1">@jhqcat/pong-v0.2.1</SelectItem>
                  <Separator/>
                  <SelectItem value="custom" disabled>Upload your own model</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" type="submit">Create game</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
