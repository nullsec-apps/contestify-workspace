import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { Bell, BellOff, Trophy, ExternalLink } from 'lucide-react'
import DeadlinePulseRing from './DeadlinePulseRing'
import { PLATFORMS } from '../lib/platforms'
import { badgeForPlacement } from '../lib/badges'
import { useContests } from '../hooks/useContests'
import type { Contest } from '../lib/contestData'
import { cn } from '../lib/utils'

export default function ContestChip({ contest, dragging }: { contest: Contest; dragging?: boolean }) {
  const toggleNudge = useContests((s) => s.toggleNudge)
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: contest.id })
  const platform = PLATFORMS[contest.platform]
  const badge = contest.placement ? badgeForPlacement(contest.placement) : null
  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        'group relative cursor-grab active:cursor-grabbing rounded-2xl border border-white/[0.06] bg-[#191C23] p-3 select-none touch-none transition-colors duration-200',
        'hover:shadow-[0_8px_30px_rgba(255,92,58,0.12)] hover:border-[#FF5C3A]/30',
        (isDragging || dragging) && 'opacity-90 shadow-2xl ring-1 ring-[#FF5C3A]/50'
      )}
    >
      <div className="flex items-start gap-3">
        <DeadlinePulseRing deadline={contest.deadline} size={52} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: platform?.color }} />
            <span className="text-[10px] uppercase tracking-wider text-[#8A8F9C] font-semibold">{platform?.name}</span>
          </div>
          <h4 className="font-display font-bold text-sm leading-tight mt-1 truncate text-[#F4F1EA]">{contest.title}</h4>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] font-semibold text-[#3DE3A0]">{contest.prize}</span>
            {badge && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: badge.color + '22', color: badge.color }}>
                <Trophy size={10} strokeWidth={2} /> {badge.label}
              </span>
            )}
          </div>
        </div>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); toggleNudge(contest.id) }}
          className={cn('shrink-0 rounded-lg p-1.5 transition-colors duration-200', contest.nudge ? 'bg-[#FF5C3A]/20 text-[#FF5C3A]' : 'text-[#8A8F9C] hover:bg-white/5')}
          title="Nudge me"
        >
          {contest.nudge ? <Bell size={14} strokeWidth={2} /> : <BellOff size={14} strokeWidth={1.5} />}
        </button>
      </div>
      <div className="absolute -bottom-1 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="flex items-center gap-1 text-[10px] text-[#8A8F9C]"><ExternalLink size={10} /> {contest.source}</span>
      </div>
    </motion.div>
  )
}