import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth";
import {authOptions} from "@/lib/auth";

export async function GameBuilder() {
  const session = (await getServerSession(authOptions)) || {};

  async function createGame(formData: FormData) {
    'use server'

    const rawFormData = {
      name: formData.get('name'),
      // @ts-ignore
      email: session ? session.user.email : "",
      model: formData.get('model'),
    }

    console.log(rawFormData)

    // ...
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
            <Input id="owner" value={session ? session?.user?.email : ""} readOnly />
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select defaultValue="@jhqcat/pong-v0.1.0" name="model">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model"/>
                </SelectTrigger>
                <SelectContent className="w-full max-w-xs">
                  <SelectItem value="@jhqcat/pong-v0.1.0">@jhqcat/pong-v0.1.0</SelectItem>
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
