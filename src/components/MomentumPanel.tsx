import { motion } from 'framer-motion'
import { Flame, Activity, Trophy, Clock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useMomentum } from '../hooks/useMomentum'
import { PLATFORMS } from '../lib/platforms'
import { formatRemaining } from '../lib/time'
import AIInsightCard from './AIInsightCard'
import TrophyShelf from './TrophyShelf'

export default function MomentumPanel() {
  const { streak, winRate, activeCount, totalWins, upcoming } = useMomentum()
  const stats = [
    { label: 'Win Streak', value: streak, icon: Flame, color: '#FF5C3A' },
    { label: 'Active', value: activeCount, icon: Activity, color: '#3DE3A0' },
    { label: 'Total Wins', value: totalWins, icon: Trophy, color: '#FFD24A' },
  ]
  return (
    <div className="flex flex-col h-full overflow-y-auto pr-1 space-y-4">
      <h3 className="font-display font-extrabold text-lg">Momentum</h3>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-white/[0.06] bg-[#191C23] p-3 text-center hover:border-white/15 transition-colors duration-200">
            <s.icon size={16} className="mx-auto mb-1" style={{ color: s.color }} strokeWidth={2} />
            <p className="font-display font-extrabold text-xl tabular-nums" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[9px] text-[#8A8F9C] uppercase tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#191C23] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#8A8F9C]">Win Rate</span>
          <span className="font-display font-extrabold text-lg text-[#3DE3A0] tabular-nums">{winRate}%</span>
        </div>
        <Progress value={winRate} className="h-2 bg-white/5" />
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Clock size={14} className="text-[#FF5C3A]" />
          <h4 className="text-xs font-semibold uppercase tracking-wide text-[#8A8F9C]">Upcoming Deadlines</h4>
        </div>
        <div className="space-y-2">
          {upcoming.length === 0 && <p className="text-xs text-[#8A8F9C]">No upcoming deadlines.</p>}
          {upcoming.map((c) => {
            const p = PLATFORMS[c.platform]
            return (
              <div key={c.id} className="flex items-center gap-2 rounded-lg bg-[#191C23] border border-white/[0.06] px-3 py-2 hover:border-[#FF5C3A]/20 transition-colors duration-200">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: p?.color }} />
                <span className="text-xs font-medium truncate flex-1">{c.title}</span>
                <span className="text-[11px] font-semibold text-[#FF5C3A] tabular-nums shrink-0">{formatRemaining(c.deadline)}</span>
              </div>
            )
          })}
        </div>
      </div>
      <AIInsightCard />
      <TrophyShelf />
    </div>
  )
}