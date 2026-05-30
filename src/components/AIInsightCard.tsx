import { motion } from 'framer-motion'
import { Sparkles, AlertTriangle, Zap, Info } from 'lucide-react'
import { useAIInsights } from '../hooks/useAIInsights'

const toneMap = {
  urgent: { icon: Zap, color: '#FF5C3A', bg: 'rgba(255,92,58,0.08)' },
  warn: { icon: AlertTriangle, color: '#FFD24A', bg: 'rgba(255,210,74,0.08)' },
  info: { icon: Info, color: '#3DE3A0', bg: 'rgba(61,227,160,0.08)' },
}

export default function AIInsightCard() {
  const insights = useAIInsights()
  return (
    <div className="rounded-xl border border-[#FF5C3A]/20 bg-gradient-to-br from-[#191C23] to-[#1f1418] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-[#FF5C3A]" strokeWidth={2} />
        <h4 className="font-display font-bold text-sm">AI Insights</h4>
      </div>
      <div className="space-y-2">
        {insights.map((ins, i) => {
          const t = toneMap[ins.tone]
          return (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-start gap-2 rounded-lg p-2"
              style={{ background: t.bg }}
            >
              <t.icon size={14} className="shrink-0 mt-0.5" style={{ color: t.color }} strokeWidth={2} />
              <p className="text-[11px] leading-snug text-[#F4F1EA]/90">{ins.text}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}