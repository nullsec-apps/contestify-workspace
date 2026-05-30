import { motion } from 'framer-motion'
import { Radar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STAGES } from '../lib/stages'
import PlatformConnectors from './PlatformConnectors'

export default function GhostPipeline({ onScan }: { onScan: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/[0.06] bg-[#191C23]/50 p-6">
      <h2 className="font-display font-extrabold text-xl mb-1 text-center">Your board is empty</h2>
      <p className="text-sm text-[#8A8F9C] mb-4 text-center">Watch a demo contest travel the pipeline, then connect a platform to fill your board.</p>
      <div className="flex gap-3 mb-6">
        {STAGES.map((s, i) => (
          <div key={s.id} className="flex-1 rounded-xl border-2 border-dashed border-white/10 p-3 min-h-[90px] relative overflow-hidden">
            <span className="text-[10px] uppercase font-semibold" style={{ color: s.color }}>{s.label}</span>
            {i === 0 && (
              <motion.div
                className="absolute left-2 top-8 rounded-lg bg-[#FF5C3A] px-2 py-1 text-[10px] font-semibold text-white"
                animate={{ x: [0, 0, 120, 240, 240, 0] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.4, 0.65, 0.85, 1] }}
              >
                Demo Jam
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <PlatformConnectors />
      <Button onClick={onScan} className="w-full mt-4 bg-[#FF5C3A] hover:bg-[#FF5C3A]/90 text-white h-11 transition-all duration-200">
        <Radar size={16} className="mr-2" /> Run auto-detect scan
      </Button>
    </motion.div>
  )
}