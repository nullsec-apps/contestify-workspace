import { Radar, LayoutGrid, Trophy, User } from 'lucide-react'
import { cn } from '../lib/utils'

export type MobileTab = 'feed' | 'board' | 'wins' | 'profile'
const tabs = [
  { id: 'feed' as const, label: 'Feed', icon: Radar },
  { id: 'board' as const, label: 'Board', icon: LayoutGrid },
  { id: 'wins' as const, label: 'Wins', icon: Trophy },
  { id: 'profile' as const, label: 'Profile', icon: User },
]

export default function MobileTabBar({ active, onChange }: { active: MobileTab; onChange: (t: MobileTab) => void }) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/[0.06] bg-[#0E1014]/95 backdrop-blur-md">
      <div className="grid grid-cols-4">
        {tabs.map((t) => {
          const on = active === t.id
          return (
            <button key={t.id} onClick={() => onChange(t.id)}
              className="flex flex-col items-center gap-1 py-2.5 min-h-[56px] justify-center transition-colors duration-200">
              <t.icon size={20} className={cn(on ? 'text-[#FF5C3A]' : 'text-[#8A8F9C]')} strokeWidth={on ? 2.2 : 1.5}
                style={on ? { filter: 'drop-shadow(0 0 6px #FF5C3A)' } : undefined} />
              <span className={cn('text-[10px] font-semibold', on ? 'text-[#FF5C3A]' : 'text-[#8A8F9C]')}>{t.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}