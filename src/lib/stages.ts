export type StageId = 'idea' | 'submit' | 'result'
export interface Stage { id: StageId; label: string; color: string; order: number }
export const STAGES: Stage[] = [
  { id: 'idea', label: 'Idea', color: '#8A8F9C', order: 0 },
  { id: 'submit', label: 'Submit', color: '#FF5C3A', order: 1 },
  { id: 'result', label: 'Result', color: '#3DE3A0', order: 2 },
]
export const STAGE_MAP: Record<StageId, Stage> = Object.fromEntries(STAGES.map((s) => [s.id, s])) as Record<StageId, Stage>