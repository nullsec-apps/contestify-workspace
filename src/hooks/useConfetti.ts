import confetti from 'canvas-confetti'
export function useConfetti() {
  return () => {
    const fire = (ratio: number, opts: confetti.Options) =>
      confetti({ ...opts, origin: { y: 0.7 }, particleCount: Math.floor(180 * ratio), colors: ['#FF5C3A', '#3DE3A0', '#FFD24A', '#F4F1EA'] })
    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }
}