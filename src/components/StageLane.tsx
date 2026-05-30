import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import StageColumn from './StageColumn'
import ContestChip from './ContestChip'
import { STAGES, type StageId } from '../lib/stages'
import { useContests, byStage } from '../hooks/useContests'
import { useConfetti } from '../hooks/useConfetti'

export default function StageLane() {
  const contests = useContests((s) => s.contests)
  const advanceStage = useContests((s) => s.advanceStage)
  const fire = useConfetti()
  const [active, setActive] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function onStart(e: DragStartEvent) { setActive(e.active.id as string) }
  function onEnd(e: DragEndEvent) {
    setActive(null)
    const id = e.active.id as string
    const over = e.over?.id as StageId | undefined
    if (!over) return
    const c = contests.find((x) => x.id === id)
    if (!c || c.stage === over) return
    advanceStage(id, over)
    if (over === 'result') fire()
  }
  const activeContest = contests.find((c) => c.id === active)

  return (
    <DndContext sensors={sensors} onDragStart={onStart} onDragEnd={onEnd}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <h2 className="font-display font-extrabold text-xl">Stage Lane</h2>
          <span className="text-xs text-[#8A8F9C]">drag chips forward → Idea → Submit → Result</span>
        </div>
        <div className="flex-1 flex gap-2 lg:gap-4 items-stretch">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex-1 flex items-stretch min-w-0">
              <StageColumn stage={stage} contests={byStage(contests, stage.id)} />
              {i < STAGES.length - 1 && (
                <div className="hidden sm:flex items-center px-1">
                  <ChevronRight size={20} className="text-[#8A8F9C]/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <DragOverlay>{activeContest ? <div className="w-72"><ContestChip contest={activeContest} dragging /></div> : null}</DragOverlay>
    </DndContext>
  )
}