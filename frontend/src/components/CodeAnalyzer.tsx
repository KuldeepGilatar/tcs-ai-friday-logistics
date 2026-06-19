'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { CardSpinner } from './CardSpinner'

interface CodeAnalyzerProps {
  onAnalysisComplete?: (result: any) => void
}

export function CodeAnalyzer({ onAnalysisComplete }: CodeAnalyzerProps) {
  const [code, setCode] = useState('def hello():\n    print("Hello, World!")')
  const [language, setLanguage] = useState('python')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/code-analysis/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      setResult(data)
      onAnalysisComplete?.(data)
      toast.success('Code analyzed successfully')
    } catch (error) {
      toast.error('Failed to analyze code')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>

      {/* Code Input */}
      <div>
        <label className="block text-sm font-semibold mb-2">Original Code</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-48 p-4 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm bg-white dark:bg-gray-800"
          placeholder="Paste your code here..."
        />
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <CardSpinner title="Quality Score" value={result.quality_score} suffix="/100" />
            <CardSpinner title="Issues Found" value={result.issues_found} />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Improvements Suggested:</h3>
            <ul className="space-y-2">
              {result.improvements?.map((imp: any, i: number) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>{imp.issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
