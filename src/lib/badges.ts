export interface Badge { label: string; color: string }
export function badgeForPlacement(placement: number): Badge {
  if (placement === 1) return { label: '1st Place', color: '#FFD24A' }
  if (placement === 2) return { label: '2nd Place', color: '#C9D1DA' }
  if (placement === 3) return { label: '3rd Place', color: '#E08A4B' }
  if (placement <= 10) return { label: 'Top 10', color: '#3DE3A0' }
  return { label: 'Finalist', color: '#8A8F9C' }
}