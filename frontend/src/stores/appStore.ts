'use client'

import { create } from 'zustand'

interface AppState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => {
    const current = get().theme
    set({ theme: current === 'light' ? 'dark' : 'light' })
  },
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
