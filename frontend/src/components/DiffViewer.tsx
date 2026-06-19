'use client'

import { useState } from 'react'

interface DiffLine {
  type: 'add' | 'remove' | 'equal'
  content: string
  lineNumber?: number
}

interface DiffViewerProps {
  originalCode: string
  improvedCode: string
  language?: string
}

export function DiffViewer({ originalCode, improvedCode, language = 'python' }: DiffViewerProps) {
  const [view, setView] = useState<'unified' | 'split'>('unified')

  const originalLines = originalCode.split('\n')
  const improvedLines = improvedCode.split('\n')

  return (
    <div className="flex flex-col h-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
        <h3 className="font-semibold">Diff View</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView('unified')}
            className={`px-3 py-1 rounded text-sm ${
              view === 'unified'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            Unified
          </button>
          <button
            onClick={() => setView('split')}
            className={`px-3 py-1 rounded text-sm ${
              view === 'split'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            Split
          </button>
        </div>
      </div>

      {/* Diff Content */}
      <div className="flex-1 overflow-auto font-mono text-sm">
        {view === 'unified' ? (
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-red-600">Original</h4>
              {originalLines.map((line, i) => (
                <div key={i} className="text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-8 text-right mr-2 text-gray-500">-</span>
                  {line}
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Improved</h4>
              {improvedLines.map((line, i) => (
                <div key={i} className="text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-8 text-right mr-2 text-gray-500">+</span>
                  {line}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <tbody>
              {Math.max(originalLines.length, improvedLines.length) > 0 &&
                Array.from({
                  length: Math.max(originalLines.length, improvedLines.length),
                }).map((_, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 dark:border-gray-700 bg-red-50 dark:bg-red-900 p-2 w-1/2 align-top">
                      <div className="text-red-600">{originalLines[i] || ''}</div>
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 bg-green-50 dark:bg-green-900 p-2 w-1/2 align-top">
                      <div className="text-green-600">{improvedLines[i] || ''}</div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
