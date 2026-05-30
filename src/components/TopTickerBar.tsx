import { Radar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContests } from '../hooks/useContests'
import { hoursUntil, formatRemaining } from '../lib/time'
import { PLATFORMS } from '../lib/platforms'
import AddContestDialog from './AddContestDialog'
import DeadlinePulseRing from './DeadlinePulseRing'

export default function TopTickerBar() {
  const contests = useContests((s) => s.contests)
  const soonest = contests
    .filter((c) => c.stage !== 'result' && hoursUntil(c.deadline) > 0)
    .sort((a, b) => a.deadline - b.deadline)
    .slice(0, 3)
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0E1014]/90 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-7 w-7 rounded-lg bg-[#FF5C3A] flex items-center justify-center font-display font-extrabold text-white text-sm">C</span>
          <span className="font-display font-extrabold hidden sm:block">Contestify</span>
        </div>
        <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {soonest.map((c) => (
            <div key={c.id} className="flex items-center gap-2 rounded-full bg-[#191C23] border border-white/[0.06] pl-1 pr-3 py-1 shrink-0 hover:border-[#FF5C3A]/20 transition-colors duration-200">
              <DeadlinePulseRing deadline={c.deadline} size={34} />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold truncate max-w-[110px]">{c.title}</p>
                <p className="text-[9px] text-[#FF5C3A]">{formatRemaining(c.deadline)} left</p>
              </div>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: PLATFORMS[c.platform]?.color }} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <AddContestDialog />
          <Button size="sm" variant="outline" className="border-[#3DE3A0]/40 text-[#3DE3A0] hover:bg-[#3DE3A0]/10 hidden sm:flex transition-all duration-200">
            <Radar size={14} className="mr-1" /> Connect
          </Button>
        </div>
      </div>
    </header>
  )
}