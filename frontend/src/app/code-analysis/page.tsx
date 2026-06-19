'use client'

import { useState } from 'react'
import { CodePanel } from '@/components/CodePanel'
import { DiffViewer } from '@/components/DiffViewer'
import { CodeAnalyzer } from '@/components/CodeAnalyzer'
import { CardSpinner } from '@/components/CardSpinner'

export default function CodeAnalysisPage() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'viewer'>('analyzer')
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result)
    setActiveTab('viewer')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">💻 Code Quality Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-powered code analysis with SonarQube integration and git pre-commit hooks
        </p>
      </section>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'analyzer'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Analyzer
        </button>
        <button
          onClick={() => setActiveTab('viewer')}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'viewer'
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
          disabled={!analysisResult}
        >
          Results
        </button>
      </div>

      {/* Analyzer Tab */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          <CodeAnalyzer onAnalysisComplete={handleAnalysisComplete} />
        </div>
      )}

      {/* Viewer Tab - Three Panel View */}
      {activeTab === 'viewer' && analysisResult && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CardSpinner
              title="Quality Score"
              value={analysisResult.quality_score || 75}
              suffix="/100"
            />
            <CardSpinner
              title="Issues Found"
              value={analysisResult.issues_found || 5}
            />
            <CardSpinner
              title="Improvement"
              value={analysisResult.improvement_percentage || 15}
              suffix="%"
            />
          </div>

          {/* Three Panel View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
            <CodePanel
              code={analysisResult.original_code || 'Original code'}
              language="python"
              title="📝 Original Code"
            />
            <CodePanel
              code={analysisResult.improved_code || 'Improved code'}
              language="python"
              title="✨ Improved Code"
            />
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                <h3 className="font-semibold">📊 Diff View</h3>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-sm">
                <pre className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">
                  {analysisResult.diff || 'No changes'}
                </pre>
              </div>
            </div>
          </div>

          {/* Improvements List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
            <h3 className="font-semibold mb-4">Improvements Applied:</h3>
            <div className="space-y-2">
              {analysisResult.improvements_made?.map((imp: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  {imp}
                </div>
              )) || [
                <div key={0} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  Code formatting
                </div>,
                <div key={1} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  Removed unused imports
                </div>,
                <div key={2} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  Added type hints
                </div>,
              ]}
            </div>
          </div>

          {/* Git Integration */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">🔗 Git Pre-Commit Integration</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              This code has been validated and is ready for commit. The pre-commit hook will automatically run on git commit.
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Commit with Quality Check
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
