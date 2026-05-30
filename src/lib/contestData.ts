import type { StageId } from './stages'
export interface Contest {
  id: string
  title: string
  platform: string
  stage: StageId
  deadline: number
  prize: string
  placement?: number
  nudge?: boolean
  updatedAt: number
  source?: string
}
const H = 36e5, D = 864e5
export const SEED_CONTESTS: Contest[] = [
  { id: 'c1', title: 'Pixel Meme War', platform: 'discord', stage: 'submit', deadline: Date.now() + 4 * H, prize: '$500', updatedAt: Date.now() - 2 * H, source: 'Discord' },
  { id: 'c2', title: 'DesignDrop Q3', platform: 'behance', stage: 'idea', deadline: Date.now() + 9 * D, prize: '$2,000', updatedAt: Date.now() - 5 * D, source: 'Behance' },
  { id: 'c3', title: 'HackTheRift', platform: 'devpost', stage: 'result', deadline: Date.now() - 1 * D, prize: '$5,000', placement: 2, updatedAt: Date.now() - 1 * D, source: 'Devpost' },
  { id: 'c4', title: 'Glitch Poster Jam', platform: 'x', stage: 'idea', deadline: Date.now() + 3 * D, prize: '$300', updatedAt: Date.now() - 4 * H, source: 'X' },
  { id: 'c5', title: 'AI Sticker Bash', platform: 'discord', stage: 'submit', deadline: Date.now() + 18 * H, prize: '$750', updatedAt: Date.now() - 6 * H, source: 'Discord' },
  { id: 'c6', title: 'Retro UI Cup', platform: 'behance', stage: 'result', deadline: Date.now() - 3 * D, prize: '$1,200', placement: 1, updatedAt: Date.now() - 3 * D, source: 'Behance' },
]
export const PROOF_CONTESTS: Contest[] = [
  { id: 'p1', title: 'Pixel Meme War', platform: 'discord', stage: 'submit', deadline: Date.now() + 4 * H, prize: '$500', updatedAt: Date.now() },
  { id: 'p2', title: 'DesignDrop Q3', platform: 'behance', stage: 'idea', deadline: Date.now() + 9 * D, prize: '$2,000', updatedAt: Date.now() },
  { id: 'p3', title: 'HackTheRift', platform: 'devpost', stage: 'result', deadline: Date.now() - 1 * D, prize: '$5,000', placement: 2, updatedAt: Date.now() },
]
export const DETECTABLE: Omit<Contest, 'stage' | 'updatedAt'>[] = [
  { id: 'd1', title: 'Neon Logo Sprint', platform: 'behance', deadline: Date.now() + 5 * D, prize: '$900', source: 'Behance' },
  { id: 'd2', title: 'Lo-Fi Cover Art', platform: 'x', deadline: Date.now() + 2 * D, prize: '$400', source: 'X' },
  { id: 'd3', title: 'DevHack Summer', platform: 'devpost', deadline: Date.now() + 11 * D, prize: '$8,000', source: 'Devpost' },
  { id: 'd4', title: 'Emoji Remix Battle', platform: 'discord', deadline: Date.now() + 30 * H, prize: '$250', source: 'Discord' },
  { id: 'd5', title: 'Brand Kit Challenge', platform: 'behance', deadline: Date.now() + 7 * D, prize: '$1,500', source: 'Behance' },
]