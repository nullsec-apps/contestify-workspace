import { create } from 'zustand'
import { DETECTABLE, type Contest } from '../lib/contestData'

type Detected = Omit<Contest, 'stage' | 'updatedAt'>
interface State {
  scanning: boolean
  detected: Detected[]
  scan: () => void
  consume: (id: string) => void
}
export const useAutoDetect = create<State>((set, get) => ({
  scanning: false,
  detected: DETECTABLE.slice(0, 3),
  scan: () => {
    if (get().scanning) return
    set({ scanning: true })
    setTimeout(() => {
      const shuffled = [...DETECTABLE].sort(() => Math.random() - 0.5)
      set({ scanning: false, detected: shuffled.slice(0, Math.floor(Math.random() * 3) + 3) })
    }, 1400)
  },
  consume: (id) => set((s) => ({ detected: s.detected.filter((d) => d.id !== id) })),
}))