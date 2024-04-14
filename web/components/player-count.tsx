'use client'
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'
import { Badge } from './ui/badge'

export function PlayerCount({ initialCount, gameId }: { initialCount: string, gameId: string }) {
    const { data } = useSWR(`/game/${gameId}/player_count`, fetcher, { fallbackData: { playerCount: initialCount }, refreshInterval: 1000 })

    return <Badge variant="secondary">{data.playerCount} players online</Badge>
}