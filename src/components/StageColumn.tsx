import { useDroppable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import ContestChip from './ContestChip'
import type { Stage } from '../lib/stages'
import type { Contest } from '../lib/contestData'
import { cn } from '../lib/utils'

export default function StageColumn({ stage, contests }: { stage: Stage; contests: Contest[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: stage.color, boxShadow: `0 0 12px ${stage.color}` }} />
          <h3 className="font-display font-bold text-sm uppercase tracking-wide" style={{ color: stage.color }}>{stage.label}</h3>
        </div>
        <span className="text-xs font-semibold text-[#8A8F9C] tabular-nums bg-white/5 px-2 py-0.5 rounded-full">{contests.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 rounded-2xl border-2 border-dashed p-2 space-y-2 min-h-[200px] transition-colors duration-200',
          isOver ? 'border-[#FF5C3A]/60 bg-[#FF5C3A]/[0.04]' : 'border-white/[0.06] bg-black/20'
        )}
      >
        {contests.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-10 text-center">
            <div className="w-full h-12 rounded-xl border border-dashed border-white/10 flex items-center justify-center mb-2">
              <span className="text-[11px] text-[#8A8F9C]">drop a contest here</span>
            </div>
          </div>
        )}
        {contests.map((c) => (
          <motion.div key={c.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
            <ContestChip contest={c} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}