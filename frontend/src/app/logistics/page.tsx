'use client'

import { useState } from 'react'
import { MapPin, TrendingDown, MapIcon } from 'lucide-react'
import { CardSpinner } from '@/components/CardSpinner'
import toast from 'react-hot-toast'

interface Shipment {
  id: string
  origin: string
  destination: string
  priority: number
  weight: number
}

export default function LogisticsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([
    { id: 'SHP001', origin: 'Mumbai', destination: 'Delhi', priority: 1, weight: 25 },
    { id: 'SHP002', origin: 'Delhi', destination: 'Bangalore', priority: 2, weight: 18 },
    { id: 'SHP003', origin: 'Bangalore', destination: 'Chennai', priority: 1, weight: 32 },
  ])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleOptimizeRoutes = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/logistics/optimize-routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shipments }),
      })

      if (!response.ok) throw new Error('Optimization failed')

      const data = await response.json()
      setResult(data)
      toast.success('Routes optimized successfully!')
    } catch (error) {
      toast.error('Failed to optimize routes')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <MapIcon className="w-8 h-8" /> Route Optimizer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-powered route optimization with real-time weather and traffic adaptation
        </p>
      </section>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardSpinner title="Shipments" value={shipments.length} />
        <CardSpinner
          title="Time Savings"
          value={result?.time_savings_percent || 20}
          suffix="%"
          icon={<TrendingDown className="w-6 h-6 text-green-500" />}
        />
        <CardSpinner
          title="Fuel Reduction"
          value={result?.fuel_reduction_percent || 15}
          suffix="%"
          icon={<TrendingDown className="w-6 h-6 text-green-500" />}
        />
      </div>

      {/* Shipments List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">📦 Shipments to Optimize</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="text-left py-2 px-4">Shipment ID</th>
                <th className="text-left py-2 px-4">Origin</th>
                <th className="text-left py-2 px-4">Destination</th>
                <th className="text-left py-2 px-4">Priority</th>
                <th className="text-left py-2 px-4">Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((ship) => (
                <tr key={ship.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 font-mono text-blue-600">{ship.id}</td>
                  <td className="py-3 px-4">{ship.origin}</td>
                  <td className="py-3 px-4">{ship.destination}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      ship.priority === 1
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}>
                      {ship.priority === 1 ? 'High' : 'Normal'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{ship.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={handleOptimizeRoutes}
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {loading ? '⏳ Optimizing Routes...' : '🚀 Optimize Routes'}
      </button>

      {/* Results */}
      {result && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">✅ Optimized Routes</h2>
          <div className="space-y-4">
            {result.optimized_routes?.map((route: any, i: number) => (
              <div key={i} className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{route.route_id}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Est. Time: {route.estimated_time}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {route.shipments?.map((id: string, j: number) => (
                    <span key={j} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded">
                      {id}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Fuel Cost: {route.fuel_cost}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
