import { create } from 'zustand'

export type WorldId =
  | 'signal'
  | 'origins'
  | 'lab'
  | 'archive'
  | 'kitchen'
  | 'stage'
  | 'horizon'

export const WORLDS: WorldId[] = [
  'signal', 'origins', 'lab', 'archive', 'kitchen', 'stage', 'horizon',
]

export const WORLD_LABELS: Record<WorldId, string> = {
  signal:  '// WORLD_01: THE SIGNAL',
  origins: '// WORLD_02: THE ORIGINS',
  lab:     '// WORLD_03: THE LAB',
  archive: '// WORLD_04: THE ARCHIVE',
  kitchen: '// WORLD_05: THE KITCHEN',
  stage:   '// WORLD_06: THE STAGE',
  horizon: '// WORLD_07: THE HORIZON',
}

export const WORLD_NAMES: Record<WorldId, string> = {
  signal:  'Signal',
  origins: 'Origins',
  lab:     'The Lab',
  archive: 'Archive',
  kitchen: 'Kitchen',
  stage:   'Stage',
  horizon: 'Horizon',
}

interface PortfolioState {
  activeWorld: WorldId
  scrollProgress: number   // 0-1 across entire 700vh
  isLoaded: boolean
  navVisible: boolean
  setActiveWorld: (world: WorldId) => void
  setScrollProgress: (p: number) => void
  setLoaded: () => void
  setNavVisible: (v: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeWorld: 'signal',
  scrollProgress: 0,
  isLoaded: false,
  navVisible: false,
  setActiveWorld: (world) => set({ activeWorld: world }),
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setLoaded: () => set({ isLoaded: true }),
  setNavVisible: (v) => set({ navVisible: v }),
}))
