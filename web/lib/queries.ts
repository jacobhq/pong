import {Redis} from "@upstash/redis";
import {Game, Player} from "@/lib/types";
import {generatePlayerId} from "@/lib/id";

const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string
})

export async function getModel(id: string): Promise<string | null> {
    return await redis.get(`model:${id}`)
}

export async function getGame(id: string, userId?: string, internal?: boolean): Promise<Game | null> {
    const game: Game | null = await redis.get(`game:${id}`)

    if (!game) return null
    if ((game.owner !== userId) && !internal) return null
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

export async function getPlayer(id: string): Promise<Player | null> {
    return await redis.get(`player:${id}`)
}

export async function newPlayer(gameId: string, displayName: string): Promise<string> {
    const payload: Player = {
        id: generatePlayerId(),
        gameId: gameId,
        displayName: displayName,
        playerScore: 0,
        modelScore: 0
    }

    await redis.set(`player:${payload.id}`, payload)
    return payload.id
}

export async function setScore(player: Player, scorer: "player" | "model", scoreModifier: number): Promise<"OK" | Player | null> {
    if (scorer === "player") player.playerScore = player.playerScore + scoreModifier
    if (scorer === "model") player.modelScore = player.modelScore + scoreModifier

    return await redis.set(`player:${player.id}`, player, {xx: true})
}