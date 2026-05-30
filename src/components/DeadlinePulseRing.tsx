import { useEffect, useState } from 'react'
import { isUrgent, ringFraction, formatRemaining } from '../lib/time'
import { cn } from '../lib/utils'

export default function DeadlinePulseRing({ deadline, size = 56 }: { deadline: number; size?: number }) {
  const [, setTick] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(i)
  }, [])
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const frac = ringFraction(deadline)
  const urgent = isUrgent(deadline)
  const ended = deadline - Date.now() <= 0
  const color = ended ? '#3DE3A0' : urgent ? '#FF5C3A' : '#8A8F9C'
  return (
    <div className={cn('relative shrink-0', urgent && 'animate-pulse')} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#2a2e38" strokeWidth={4} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-semibold tabular-nums" style={{ color }}>
          {formatRemaining(deadline)}
        </span>
      </div>
      {urgent && !ended && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ boxShadow: `0 0 0 2px ${color}` }} />
      )}
    </div>
  )
}