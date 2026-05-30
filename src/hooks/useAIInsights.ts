import { useContests } from './useContests'
import { hoursUntil } from '../lib/time'

export interface Insight { id: string; text: string; tone: 'urgent' | 'warn' | 'info' }
export function useAIInsights(): Insight[] {
  const contests = useContests((s) => s.contests)
  const out: Insight[] = []
  const urgent = contests
    .filter((c) => c.stage !== 'result' && hoursUntil(c.deadline) > 0 && hoursUntil(c.deadline) < 6)
    .sort((a, b) => a.deadline - b.deadline)[0]
  if (urgent) out.push({ id: 'u', text: `${urgent.title} closes in under 6h — finish your submit now.`, tone: 'urgent' })
  const stale = contests.find((c) => c.stage === 'idea' && Date.now() - c.updatedAt > 3 * 864e5)
  if (stale) out.push({ id: 's', text: `Stale idea: ${stale.title} untouched for days — advance it or drop it.`, tone: 'warn' })
  const fresh = contests.filter((c) => c.stage === 'result' && c.placement && c.placement <= 3)[0]
  if (fresh) out.push({ id: 'w', text: `You're winning ${fresh.title}! Share the result to build momentum.`, tone: 'info' })
  if (out.length === 0) out.push({ id: 'd', text: 'Pipeline looks healthy. Run a scan to discover fresh contests.', tone: 'info' })
  return out.slice(0, 3)
}