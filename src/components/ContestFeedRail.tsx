import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Radar, Loader2 } from 'lucide-react'
import { useAutoDetect } from '../hooks/useAutoDetect'
import { useContests } from '../hooks/useContests'
import { PLATFORMS } from '../lib/platforms'
import PlatformConnectors from './PlatformConnectors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

export default function ContestFeedRail() {
  const { scanning, detected, scan, consume } = useAutoDetect()
  const add = useContests((s) => s.add)
  function handleAdd(id: string) {
    const d = detected.find((c) => c.id === id)
    if (!d) return
    add({ ...d, stage: 'idea', updatedAt: Date.now() })
    consume(id)
    toast.success('Added to board', { style: { background: '#191C23', color: '#F4F1EA', border: '1px solid #3DE3A0' } })
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radar size={18} className="text-[#FF5C3A]" strokeWidth={2} />
          <h3 className="font-display font-bold text-sm">Live Feed</h3>
        </div>
        <Button size="sm" variant="ghost" onClick={scan} disabled={scanning} className="h-7 text-xs text-[#FF5C3A] hover:bg-[#FF5C3A]/10 transition-all duration-200">
          {scanning ? <Loader2 size={13} className="animate-spin mr-1" /> : <Radar size={13} className="mr-1" />}
          {scanning ? 'Scanning' : 'Run scan'}
        </Button>
      </div>
      <PlatformConnectors />
      <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1">
        {scanning && [0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-[#191C23] p-3 animate-pulse">
            <div className="h-3 w-20 bg-white/10 rounded mb-2" />
            <div className="h-4 w-32 bg-white/10 rounded" />
          </div>
        ))}
        <AnimatePresence>
          {!scanning && detected.map((c) => {
            const p = PLATFORMS[c.platform]
            return (
              <motion.div key={c.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="rounded-xl border border-white/[0.06] bg-[#191C23] p-3 hover:border-[#FF5C3A]/30 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full" style={{ background: p?.color }} />
                  <span className="text-[10px] uppercase tracking-wider text-[#8A8F9C] font-semibold">{p?.name}</span>
                  <Badge variant="outline" className="ml-auto text-[9px] border-[#3DE3A0]/40 text-[#3DE3A0] px-1.5 py-0">new</Badge>
                </div>
                <h4 className="font-display font-bold text-sm leading-tight">{c.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] font-semibold text-[#3DE3A0]">{c.prize}</span>
                  <Button size="sm" onClick={() => handleAdd(c.id)} className="h-6 text-[11px] bg-[#FF5C3A] hover:bg-[#FF5C3A]/90 text-white px-2 transition-all duration-200">
                    <Plus size={12} className="mr-0.5" /> Add
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        {!scanning && detected.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-[#8A8F9C]">No new contests detected.</p>
            <p className="text-[11px] text-[#8A8F9C]/60 mt-1">Run a scan to find more.</p>
          </div>
        )}
      </div>
    </div>
  )
}