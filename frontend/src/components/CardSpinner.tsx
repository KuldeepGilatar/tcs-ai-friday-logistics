'use client'

import React from 'react'
import { TrendingUp } from 'lucide-react'

interface CardSpinnerProps {
  title: string
  value: number | string
  suffix?: string
  icon?: React.ReactNode
}

export function CardSpinner({ title, value, suffix = '', icon }: CardSpinnerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {value}
            {suffix}
          </p>
        </div>
        <div className="text-blue-500">
          {icon || <TrendingUp className="w-6 h-6" />}
        </div>
      </div>
    </div>
  )
}
