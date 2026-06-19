'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodePanelProps {
  code: string
  language: string
  title: string
}

export function CodePanel({ code, language, title }: CodePanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
        <h3 className="font-semibold">{title}</h3>
        <button
          onClick={handleCopy}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
