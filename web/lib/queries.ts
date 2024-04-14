import { generatePlayerId } from "@/lib/id";
import { db } from "@/db/connect";
import { games, players } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
import { Game, GameState, Player } from "./types";

export async function getModelId(name: string): Promise<string | undefined> {
    const model = await db.query.models.findFirst({
        where: (model, { eq }) => (eq(model.name, name))
    })
    if (!model) return undefined
    return model.id
}

export async function getModelUrl(name: string): Promise<string | undefined> {
    const model = await db.query.models.findFirst({
        where: (model, { eq }) => (eq(model.name, name))
    })
    if (!model) return undefined
    return model.downloadUrl
}

export async function getGame(id: string, userId?: string, internal?: boolean): Promise<Game | undefined> {
    return await db.query.games.findFirst({
        where: (game, { and, eq }) => and((eq(game.id, id)), !internal && userId ? (eq(game.owner, userId)) : undefined)
    })
}

export async function getGames(userId: string): Promise<Game[]> {
    return await db.query.games.findMany({
        where: (eq(games.owner, userId))
    })
}

export async function newGame(payload: Game) {
    return await db.insert(games).values({
        ...payload
    })
}

export async function delGame(id: string, userId: string) {
    return await db.delete(games).where(
        and((eq(games.id, id)), (eq(games.owner, userId)))
    )
}

export async function setGameState(id: string, state: GameState) {
    return await db.update(games).set({ state: state }).where(eq(games.id, id)).returning()
}

export async function getPlayer(id: string): Promise<Player | undefined> {
    return await db.query.players.findFirst({
        where: eq(players.id, id)
    })
}

export async function playerCount(gameId: string) {
    return await db.select({ count: count() }).from(players).where(eq(players.gameId, gameId))
}

export async function newPlayer(gameId: string, displayName: string): Promise<string> {
    const payload: Player = {
        id: generatePlayerId(),
        userId: null,
        gameId: gameId,
        displayName: displayName,
        playerScore: 0,
        modelScore: 0
    }

    const player = await db.insert(players).values(payload).returning()
    return player[0].id
}

export async function setScore(player: Player, scorer: "player" | "model", scoreModifier: number) {
    if (scorer === "player") player.playerScore = player.playerScore + scoreModifier
    if (scorer === "model") player.modelScore = player.modelScore + scoreModifier

    return await db.update(players).set(
        scorer === "player" ? { playerScore: player.playerScore } : { modelScore: player.modelScore }
    )
}