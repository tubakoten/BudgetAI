import { useEffect, useRef } from 'react'

const COLORS = ['#185FA5', '#1D9E75', '#BA7517', '#D4537E', '#7F77DD', '#888780']

export default function SpendingChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    import('https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.js').then(() => {
      const Chart = window.Chart
      if (!Chart || !canvasRef.current) return
      const existing = Chart.getChart(canvasRef.current)
      if (existing) existing.destroy()

      const labels = Object.keys(data)
      const values = Object.values(data)

      new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{ data: values, backgroundColor: COLORS, borderWidth: 2 }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
        }
      })
    })
  }, [data])

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-600 mb-3">Kategori dağılımı</p>
      <div style={{ height: 200 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}