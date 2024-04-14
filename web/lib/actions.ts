import { Redis } from "@upstash/redis";
import { Game } from "@/lib/types";

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})


export async function startGame(game: Game): Promise<"OK" | Game | null> {
    'use server'
    const startedGame: Game = {
        ...game,
        state: "ongoing",
    }
    return await redis.set(`game:${game.id}`, startedGame)
}