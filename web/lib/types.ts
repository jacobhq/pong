// DB = `game:${id}`
export type Game = {
    id: string
    name: string
    owner: string
    model: string
}

// DB = `player:${id}`
export type Player = {
    id: string
    gameId: string
    userId?: string
    displayName: string
    playerScore: number
    modelScore: number
}

export type JoinRes = {
    playerId: string
    gameId: string
    modelUrl: string
}