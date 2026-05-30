import { useState } from 'react'
import { Trophy } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useContests } from '../hooks/useContests'
import { useConfetti } from '../hooks/useConfetti'
import { badgeForPlacement } from '../lib/badges'
import { PLATFORMS } from '../lib/platforms'
import type { Contest } from '../lib/contestData'

export default function TrophyShelf() {
  const contests = useContests((s) => s.contests)
  const fire = useConfetti()
  const wins = contests.filter((c) => c.stage === 'result' && c.placement)
  const [selected, setSelected] = useState<Contest | null>(null)
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <Trophy size={14} className="text-[#FFD24A]" />
        <h4 className="text-xs font-semibold uppercase tracking-wide text-[#8A8F9C]">Trophy Shelf</h4>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-[#191C23] p-3">
        {wins.length === 0 ? (
          <p className="text-xs text-[#8A8F9C] text-center py-3">No trophies yet — push a contest to Result to win.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {wins.map((c) => {
              const b = badgeForPlacement(c.placement!)
              return (
                <button key={c.id} onClick={() => { setSelected(c); fire() }}
                  className="group flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-white/5 transition-colors duration-200">
                  <span className="h-10 w-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{ background: b.color + '22', boxShadow: `0 0 16px ${b.color}44` }}>
                    <Trophy size={18} style={{ color: b.color }} strokeWidth={2} />
                  </span>
                  <span className="text-[9px] font-semibold text-center leading-tight truncate w-full" style={{ color: b.color }}>{b.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="bg-[#191C23] border-white/10 text-[#F4F1EA]">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display flex items-center gap-2">
                  <Trophy size={20} style={{ color: badgeForPlacement(selected.placement!).color }} />
                  {selected.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: PLATFORMS[selected.platform]?.color }} />
                  <span className="text-sm text-[#8A8F9C]">{PLATFORMS[selected.platform]?.name}</span>
                </div>
                <div className="rounded-xl p-4 text-center" style={{ background: badgeForPlacement(selected.placement!).color + '15' }}>
                  <p className="font-display font-extrabold text-2xl" style={{ color: badgeForPlacement(selected.placement!).color }}>
                    {badgeForPlacement(selected.placement!).label}
                  </p>
                  <p className="text-sm text-[#3DE3A0] mt-1">Prize: {selected.prize}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}