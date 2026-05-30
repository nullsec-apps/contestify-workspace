import { Check, Plug } from 'lucide-react'
import { useConnections } from '../hooks/useConnections'
import { cn } from '../lib/utils'

export default function PlatformConnectors() {
  const { platforms, connected, toggle } = useConnections()
  return (
    <div className="grid grid-cols-2 gap-2">
      {platforms.map((p) => {
        const on = connected[p.id]
        return (
          <button
            key={p.id}
            onClick={() => toggle(p.id)}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-all duration-200',
              on ? 'border-[#3DE3A0]/40 bg-[#3DE3A0]/[0.06]' : 'border-white/[0.06] bg-[#191C23] hover:border-white/20'
            )}
          >
            <span className="h-6 w-6 rounded-md flex items-center justify-center shrink-0" style={{ background: p.color }}>
              <span className="text-[10px] font-bold" style={{ color: p.id === 'x' ? '#0E1014' : '#fff' }}>{p.name[0]}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate">{p.name}</p>
              <p className={cn('text-[9px]', on ? 'text-[#3DE3A0]' : 'text-[#8A8F9C]')}>{on ? 'Connected' : 'Tap to connect'}</p>
            </div>
            {on ? <Check size={14} className="text-[#3DE3A0] shrink-0" /> : <Plug size={13} className="text-[#8A8F9C] shrink-0" />}
          </button>
        )
      })}
    </div>
  )
}