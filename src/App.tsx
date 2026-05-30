import ErrorBoundary from './components/ErrorBoundary'
import HeroFirstScreen from './components/HeroFirstScreen'
import WorkspaceShell from './components/WorkspaceShell'
import { useContests } from './hooks/useContests'

export default function App() {
  const started = useContests((s) => s.started)
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0E1014] text-[#F4F1EA] overflow-x-hidden">
        {started ? <WorkspaceShell /> : <HeroFirstScreen />}
      </div>
    </ErrorBoundary>
  )
}