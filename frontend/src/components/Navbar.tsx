'use client'

import { useTheme } from '@/hooks/useTheme'
import { Menu, Moon, Sun, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">🚀 TCS AI Friday</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/logistics" className="hover:text-blue-600 transition-colors">
            Route Optimizer
          </Link>
          <Link href="/chatbot" className="hover:text-blue-600 transition-colors">
            Chatbot
          </Link>
          <Link href="/code-analysis" className="hover:text-blue-600 transition-colors">
            Code Quality
          </Link>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <Link href="/logistics" className="block py-2 hover:text-blue-600">
            Route Optimizer
          </Link>
          <Link href="/chatbot" className="block py-2 hover:text-blue-600">
            Chatbot
          </Link>
          <Link href="/code-analysis" className="block py-2 hover:text-blue-600">
            Code Quality
          </Link>
        </div>
      )}
    </nav>
  )
}
