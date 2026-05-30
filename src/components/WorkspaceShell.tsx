import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import TopTickerBar from './TopTickerBar'
import ContestFeedRail from './ContestFeedRail'
import StageLane from './StageLane'
import MomentumPanel from './MomentumPanel'
import GhostPipeline from './GhostPipeline'
import MobileTabBar, { type MobileTab } from './MobileTabBar'
import { useContests } from '../hooks/useContests'
import { useAutoDetect } from '../hooks/useAutoDetect'
import TrophyShelf from './TrophyShelf'
import { useMomentum } from '../hooks/useMomentum'

export default function WorkspaceShell() {
  const contests = useContests((s) => s.contests)
  const { scan } = useAutoDetect()
  const { activeCount } = useMomentum()
  const [tab, setTab] = useState<MobileTab>('board')
  const empty = contests.length === 0

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="bottom-center" />
      <TopTickerBar />
      {/* Desktop split */}
      <div className="hidden lg:flex flex-1 gap-4 px-6 py-5 max-w-[1600px] mx-auto w-full">
        <aside className="w-[320px] shrink-0 h-[calc(100vh-120px)] sticky top-[68px]">
          <ContestFeedRail />
        </aside>
        <main className="flex-1 min-w-0">
          {empty ? <GhostPipeline onScan={scan} /> : <StageLane />}
        </main>
        <aside className="w-[340px] shrink-0 h-[calc(100vh-120px)] sticky top-[68px]">
          <MomentumPanel />
        </aside>
      </div>
      {/* Mobile */}
      <div className="lg:hidden flex-1 px-4 py-4 pb-24">
        {empty && tab === 'board' ? <GhostPipeline onScan={scan} /> : (
          <>
            {tab === 'feed' && <ContestFeedRail />}
            {tab === 'board' && <StageLane />}
            {tab === 'wins' && <TrophyShelf />}
            {tab === 'profile' && (
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-2xl">Your Profile</h2>
                <div className="rounded-2xl border border-white/[0.06] bg-[#191C23] p-5">
                  <div className="flex items-center gap-3">
                    <span className="h-14 w-14 rounded-full bg-[#FF5C3A] flex items-center justify-center font-display font-extrabold text-xl text-white">SC</span>
                    <div>
                      <p className="font-display font-bold">Sarah Chen</p>
                      <p className="text-xs text-[#8A8F9C]">{activeCount} active contests</p>
                    </div>
                  </div>
                </div>
                <MomentumPanel />
              </div>
            )}
          </>
        )}
      </div>
      <MobileTabBar active={tab} onChange={setTab} />
    </div>
  )
}