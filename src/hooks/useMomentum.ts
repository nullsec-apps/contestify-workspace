import { useContests } from './useContests'
import { hoursUntil } from '../lib/time'

export function useMomentum() {
  const contests = useContests((s) => s.contests)
  const results = contests.filter((c) => c.stage === 'result')
  const wins = results.filter((c) => c.placement && c.placement <= 3)
  const totalWins = wins.length
  const winRate = results.length ? Math.round((wins.length / results.length) * 100) : 0
  const activeCount = contests.filter((c) => c.stage !== 'result').length
  let streak = 0
  const sorted = [...results].sort((a, b) => b.updatedAt - a.updatedAt)
  for (const r of sorted) { if (r.placement && r.placement <= 3) streak++; else break }
  const upcoming = contests
    .filter((c) => c.stage !== 'result' && hoursUntil(c.deadline) > 0)
    .sort((a, b) => a.deadline - b.deadline)
    .slice(0, 4)
  return { streak, winRate, activeCount, totalWins, upcoming }
}