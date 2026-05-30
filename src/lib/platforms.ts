export interface Platform { id: string; name: string; color: string }
export const PLATFORM_LIST: Platform[] = [
  { id: 'devpost', name: 'Devpost', color: '#003E54' === '#003E54' ? '#2EC4D9' : '#2EC4D9' },
  { id: 'behance', name: 'Behance', color: '#1769FF' },
  { id: 'discord', name: 'Discord', color: '#5865F2' },
  { id: 'x', name: 'X', color: '#E7E9EA' },
]
export const PLATFORMS: Record<string, Platform> = Object.fromEntries(PLATFORM_LIST.map((p) => [p.id, p]))