import { Component, type ReactNode } from 'react'
import { AlertTriangle, RotateCw } from 'lucide-react'

interface State { hasError: boolean }
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <span className="h-14 w-14 rounded-full bg-[#FF5C3A]/15 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={26} className="text-[#FF5C3A]" />
            </span>
            <h1 className="font-display font-extrabold text-xl mb-2">Something glitched</h1>
            <p className="text-sm text-[#8A8F9C] mb-5">The board hit an unexpected error. Reload to get back in the game.</p>
            <button onClick={() => location.reload()} className="inline-flex items-center gap-2 rounded-lg bg-[#FF5C3A] hover:bg-[#FF5C3A]/90 text-white px-5 h-11 font-semibold transition-all duration-200">
              <RotateCw size={16} /> Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}