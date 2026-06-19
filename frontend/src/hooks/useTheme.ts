'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/stores/appStore'

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  return { theme, toggleTheme }
}
