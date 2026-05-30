import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useContests } from '../hooks/useContests'
import { PROOF_CONTESTS } from '../lib/contestData'
import { PLATFORMS } from '../lib/platforms'
import DeadlinePulseRing from './DeadlinePulseRing'
import { badgeForPlacement } from '../lib/badges'
import { STAGES } from '../lib/stages'

export default function HeroFirstScreen() {
  const setStarted = useContests((s) => s.setStarted)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-[#FF5C3A] flex items-center justify-center font-display font-extrabold text-white">C</span>
          <span className="font-display font-extrabold text-lg">Contestify</span>
        </div>
        <Badge variant="outline" className="border-[#3DE3A0]/40 text-[#3DE3A0] gap-1"><Sparkles size={11} /> AI-powered</Badge>
      </header>
      <div className="flex-1 flex flex-col lg:flex-row items-center gap-10 px-4 sm:px-8 lg:px-16 py-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Every contest you're in. <span className="text-[#FF5C3A]">One board that fights for you.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[#8A8F9C] mt-5 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Contestify auto-detects entries from Devpost, Behance, Discord and X, then moves them through Idea → Submit → Result so you never miss a deadline or a win.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
            <Button onClick={() => setStarted(true)} className="bg-[#FF5C3A] hover:bg-[#FF5C3A]/90 text-white h-12 px-6 text-base transition-all duration-200">
              Connect a platform <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button onClick={() => setStarted(true)} variant="outline" className="border-white/15 h-12 px-6 text-base hover:bg-white/5 transition-all duration-200">
              Explore the board
            </Button>
          </motion.div>
          <div className="flex items-center gap-3 mt-6 justify-center lg:justify-start">
            {Object.values(PLATFORMS).map((p) => (
              <span key={p.id} className="h-8 w-8 rounded-lg flex items-center justify-center text-[11px] font-bold" style={{ background: p.color, color: p.id === 'x' ? '#0E1014' : '#fff' }}>{p.name[0]}</span>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="flex-1 w-full max-w-md">
          <div className="rounded-2xl border border-white/[0.06] bg-[#191C23] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A8F9C]">Live Stage Lane preview</span>
            </div>
            <div className="space-y-3">
              {PROOF_CONTESTS.map((c, i) => {
                const p = PLATFORMS[c.platform]
                const stage = STAGES.find((s) => s.id === c.stage)!
                const badge = c.placement ? badgeForPlacement(c.placement) : null
                return (
                  <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/20 p-3">
                    <DeadlinePulseRing deadline={c.deadline} size={48} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: p?.color }} />
                        <span className="text-[9px] uppercase tracking-wide text-[#8A8F9C] font-semibold">{p?.name}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm truncate">{c.title}</h4>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 inline-block" style={{ background: stage.color + '22', color: stage.color }}>{stage.label}</span>
                    </div>
                    {badge && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full shrink-0" style={{ background: badge.color + '22', color: badge.color }}>
                        <Trophy size={11} /> {badge.label}
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}