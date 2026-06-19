'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Code, Send, Route } from 'lucide-react'

export default function Home() {
  useEffect(() => {
    console.log('🚀 TCS AI Friday Frontend Loaded')
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          🚀 TCS AI Friday
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Logistics Route Optimizer + Customer Chatbot + Code Quality System
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Route Optimizer Card */}
        <Link href="/logistics">
          <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <Route className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold">Route Optimizer</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI-powered route optimization with real-time traffic and weather adaptation
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ TSP Algorithm</p>
              <p>✅ Real-time Data</p>
              <p>✅ 20% Time Savings</p>
            </div>
          </div>
        </Link>

        {/* Chatbot Card */}
        <Link href="/chatbot">
          <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <Send className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold">Customer Chatbot</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Conversational AI for shipment inquiries and customer support
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ 70% Resolution Rate</p>
              <p>✅ RAG Context</p>
              <p>✅ WebSocket Streaming</p>
            </div>
          </div>
        </Link>

        {/* Code Analysis Card */}
        <Link href="/code-analysis">
          <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <Code className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold">Code Quality</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              SonarQube + AI feedback loop with git pre-commit integration
            </p>
            <div className="space-y-2 text-sm">
              <p>✅ 3-Panel Viewer</p>
              <p>✅ Diff Visualization</p>
              <p>✅ Git Integration</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold">20%</p>
            <p className="text-blue-100">Delivery Time Saved</p>
          </div>
          <div>
            <p className="text-4xl font-bold">70%</p>
            <p className="text-blue-100">Query Resolution</p>
          </div>
          <div>
            <p className="text-4xl font-bold">3</p>
            <p className="text-blue-100">Multi-Agent System</p>
          </div>
          <div>
            <p className="text-4xl font-bold">∞</p>
            <p className="text-blue-100">Languages Supported</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start with route optimization, chatbot, or code analysis
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/logistics">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </Link>
          <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 transition-colors">
              API Docs
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}
