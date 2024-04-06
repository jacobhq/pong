import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Leaderboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row items-between space-x-2 justify-between">
          <div className="grid gap-0.5">
            <CardTitle className="text-sm font-semibold">Realtime Leaderboard</CardTitle>
            <CardDescription className="text-xs">Top performers and their scores</CardDescription>
          </div>
          <div className="flex flex-row ml-auto items-center space-x-2">
            <Button size="sm">Pause</Button>
            <Button size="sm">Refresh</Button>
            <Button size="sm">Settings</Button>
            <Button size="sm">Fullscreen</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col w-full text-sm font-medium grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div className="flex flex-row items-center gap-4 p-4 border-t last:border-b bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center w-4 h-4 text-sm font-medium">1</div>
              <div className="flex items-center w-12 h-12">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="48"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "48/48",
                    objectFit: "cover",
                  }}
                  width="48"
                />
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm font-semibold">Ella Hughes</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@ellahughes</div>
              </div>
              <div className="ml-auto text-2xl font-semibold">1200</div>
            </div>
            <div className="flex flex-row items-center gap-4 p-4 border-t last:border-b">
              <div className="flex items-center w-4 h-4 text-sm font-medium">2</div>
              <div className="flex items-center w-12 h-12">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="48"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "48/48",
                    objectFit: "cover",
                  }}
                  width="48"
                />
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm font-semibold">Ava Adams</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@avaadams</div>
              </div>
              <div className="ml-auto text-2xl font-semibold">1100</div>
            </div>
            <div className="flex flex-row items-center gap-4 p-4 border-t last:border-b bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center w-4 h-4 text-sm font-medium">3</div>
              <div className="flex items-center w-12 h-12">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="48"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "48/48",
                    objectFit: "cover",
                  }}
                  width="48"
                />
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm font-semibold">Mia Moore</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@miamoore</div>
              </div>
              <div className="ml-auto text-2xl font-semibold">1000</div>
            </div>
            <div className="flex flex-row items-center gap-4 p-4 border-t last:border-b">
              <div className="flex items-center w-4 h-4 text-sm font-medium">4</div>
              <div className="flex items-center w-12 h-12">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="48"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "48/48",
                    objectFit: "cover",
                  }}
                  width="48"
                />
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm font-semibold">Liam Lee</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@liamlee</div>
              </div>
              <div className="ml-auto text-2xl font-semibold">950</div>
            </div>
            <div className="flex flex-row items-center gap-4 p-4 border-t last:border-b bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center w-4 h-4 text-sm font-medium">5</div>
              <div className="flex items-center w-12 h-12">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="48"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "48/48",
                    objectFit: "cover",
                  }}
                  width="48"
                />
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm font-semibold">Noah Nelson</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@noahnelson</div>
              </div>
              <div className="ml-auto text-2xl font-semibold">900</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
