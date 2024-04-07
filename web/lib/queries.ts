import {Redis} from "@upstash/redis";
import {Game} from "@/lib/types";

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})

export async function getModel(id: string): Promise<string | null> {
    return await redis.get(`model:${id}`)
}

export async function getGame(id: string, userId: string): Promise<Game | null> {
    const game: Game | null = await redis.get(`game:${id}`)

    if (!game) return null
    if (game.owner !== userId) return null
    return game
}

export async function newGame(payload: Game): Promise<"OK" | Game | null> {
    return await redis.set(`game:${payload.id}`, payload)
}

export async function delGame(id: string, userId: string): Promise<number | null> {
    const game: Game | null = await redis.get(`game:${id}`)
    if (!game) return null
    if (game.owner !== userId) return null

    return await redis.del(`game:${id}`)
}