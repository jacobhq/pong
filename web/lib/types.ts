import { games, models, players } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"

export type Model = InferSelectModel<typeof models>
export type Player = InferSelectModel<typeof players>
export type Game = InferSelectModel<typeof games>

export type JoinRes = {
    playerId: string
    gameId: string
    modelUrl: string
}

export type ScoreRes = {
    player: number
    model: number
}