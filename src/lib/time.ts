export function hoursUntil(deadline: number) { return (deadline - Date.now()) / 36e5 }
export function isUrgent(deadline: number) { const h = hoursUntil(deadline); return h > 0 && h < 6 }
export function ringFraction(deadline: number) {
  const total = 7 * 24 * 36e5
  const remaining = deadline - Date.now()
  if (remaining <= 0) return 0
  return Math.min(1, Math.max(0, remaining / total))
}
export function formatRemaining(deadline: number) {
  const ms = deadline - Date.now()
  if (ms <= 0) return 'done'
  const h = Math.floor(ms / 36e5)
  const m = Math.floor((ms % 36e5) / 6e4)
  const d = Math.floor(h / 24)
  if (d >= 1) return d + 'd'
  if (h >= 1) return h + 'h'
  return m + 'm'
}