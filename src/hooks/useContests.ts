import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SEED_CONTESTS, type Contest } from '../lib/contestData'
import type { StageId } from '../lib/stages'

interface State {
  contests: Contest[]
  started: boolean
  setStarted: (v: boolean) => void
  add: (c: Contest) => void
  remove: (id: string) => void
  advanceStage: (id: string, stage: StageId) => void
  toggleNudge: (id: string) => void
}

export const useContests = create<State>()(
  persist(
    (set) => ({
      contests: SEED_CONTESTS,
      started: false,
      setStarted: (v) => set({ started: v }),
      add: (c) => set((s) => (s.contests.some((x) => x.id === c.id) ? s : { contests: [c, ...s.contests] })),
      remove: (id) => set((s) => ({ contests: s.contests.filter((c) => c.id !== id) })),
      advanceStage: (id, stage) =>
        set((s) => ({
          contests: s.contests.map((c) =>
            c.id === id
              ? { ...c, stage, updatedAt: Date.now(), placement: stage === 'result' && !c.placement ? Math.floor(Math.random() * 3) + 1 : c.placement }
              : c
          ),
        })),
      toggleNudge: (id) => set((s) => ({ contests: s.contests.map((c) => (c.id === id ? { ...c, nudge: !c.nudge } : c)) })),
    }),
    { name: 'contestify-v1' }
  )
)

export const byStage = (contests: Contest[], stage: StageId) =>
  contests.filter((c) => c.stage === stage).sort((a, b) => a.deadline - b.deadline)