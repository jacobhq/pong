"use client"
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type PlayerWithIndex = {
    id: string;
    userId: string | null;
    displayName: string;
    gameId: string;
    playerScore: number;
    modelScore: number;
    grading: number;
    index: number;
}

export function LeaderboardRanking({ id, initialPlayers }: {
    id: string,
    initialPlayers: PlayerWithIndex[]
}) {
    const { data: players } = useSWR(`/game/${id}/top_five`, fetcher, { fallbackData: initialPlayers, refreshInterval: 500 })

    return players.map((player: PlayerWithIndex) => (
        <div key={player.id} className="flex flex-row items-center gap-4 p-4 border-t last:border-b">
            <div className="flex items-center w-4 h-4 text-sm font-medium">{player.index + 1}</div>
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
                <div className="text-sm font-semibold">{player.displayName}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{player.id}</div>
            </div>
            <div className="ml-auto text-2xl font-semibold">{player.playerScore}:{player.modelScore} - {player.grading}</div>
        </div>
    ))
}