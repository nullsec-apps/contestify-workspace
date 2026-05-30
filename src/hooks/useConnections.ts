import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PLATFORM_LIST } from '../lib/platforms'

interface State {
  connected: Record<string, boolean>
  toggle: (id: string) => void
}
const useStore = create<State>()(
  persist(
    (set) => ({
      connected: { devpost: true, discord: true, behance: false, x: false },
      toggle: (id) => set((s) => ({ connected: { ...s.connected, [id]: !s.connected[id] } })),
    }),
    { name: 'contestify-connections' }
  )
)
export function useConnections() {
  const connected = useStore((s) => s.connected)
  const toggle = useStore((s) => s.toggle)
  return { platforms: PLATFORM_LIST, connected, toggle }
}