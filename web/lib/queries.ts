import {Redis} from "@upstash/redis";
import {Game} from "@/lib/types";

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})

export async function getModel(id: string): Promise<string | null> {
    return await redis.get(`model:${id}`)
}

export async function getGame(id: string): Promise<Game | null> {
    return await redis.get(`game:${id}`)
}

export async function newGame(payload: Game): Promise<"OK" | Game | null> {
    return await redis.set(`game:${payload.id}`, payload)
}