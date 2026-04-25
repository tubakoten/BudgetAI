import { useState, useMemo } from 'react'
import { calculateBudgetSummary, groupExpensesByCategory } from '../../business/budgetService'
import { getAlertLevel } from '../../business/alertService'
import TransactionForm from './TransactionForm'
import SpendingChart from './SpendingChart'
import TransactionList from './TransactionList'

const MOCK_TRANSACTIONS = [
  { id: 1, type: 'income',  desc: 'Maaş',        amount: 45000, cat: 'Diğer',   date: '2026-04-01' },
  { id: 2, type: 'expense', desc: 'Kira',         amount: 12000, cat: 'Kira',    date: '2026-04-02' },
  { id: 3, type: 'expense', desc: 'Migros',       amount: 2800,  cat: 'Market',  date: '2026-04-05' },
  { id: 4, type: 'expense', desc: 'İstanbul Kart',amount: 600,   cat: 'Ulaşım',  date: '2026-04-06' },
  { id: 5, type: 'expense', desc: 'Netflix',      amount: 150,   cat: 'Eğlence', date: '2026-04-07' },
  { id: 6, type: 'expense', desc: 'Eczane',       amount: 340,   cat: 'Sağlık',  date: '2026-04-08' },
]

export default function Dashboard() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)
  const [undoBuffer, setUndoBuffer] = useState(null)

  const summary   = useMemo(() => calculateBudgetSummary(transactions), [transactions])
  const catData   = useMemo(() => groupExpensesByCategory(transactions), [transactions])
  const alertInfo = useMemo(() => getAlertLevel(summary.usageRatio), [summary])

  const addTransaction = (tx) => {
    setTransactions(prev => [{ ...tx, id: Date.now(), amount: Number(tx.amount) }, ...prev])
  }

  
  const deleteTransaction = (id) => {
    const target = transactions.find(t => t.id === id)
    setUndoBuffer(target)
    setTransactions(prev => prev.filter(t => t.id !== id))
    setTimeout(() => setUndoBuffer(null), 5000)
  }

  const undo = () => {
    if (!undoBuffer) return
    setTransactions(prev => [undoBuffer, ...prev])
    setUndoBuffer(null)
  }

  const pct = Math.min(Math.round(summary.usageRatio * 100), 100)
  const barColor = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-400' : 'bg-emerald-500'

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="font-medium text-gray-800">💰 BütçeAI</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Nisan 2026</span>
      </div>

      {/* Sarı Alarm */}
      {alertInfo.level !== 'none' && (
        <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
          alertInfo.level === 'danger' ? 'bg-red-50 text-red-700 border border-red-200'
                                       : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          <span>⚠️</span> {alertInfo.message}
        </div>
      )}

      {/* Geri Al */}
      {undoBuffer && (
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3 text-sm">
          <span className="text-gray-600">İşlem silindi.</span>
          <button onClick={undo} className="text-emerald-600 underline font-medium">Geri Al</button>
        </div>
      )}

      {/* Metrik Kartlar */}
      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Gelir"  value={summary.totalIncome}  color="text-emerald-700" />
        <MetricCard label="Gider"  value={summary.totalExpense} color="text-red-700" />
        <MetricCard label="Kalan"  value={summary.remaining}
          color={summary.remaining >= 0 ? 'text-emerald-700' : 'text-red-700'} />
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Bütçe kullanımı</span><span>{pct}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: pct + '%' }} />
        </div>
      </div>

      {/* Grafik */}
      <SpendingChart data={catData} />

      {/* Form */}
      <TransactionForm onAdd={addTransaction} />

      {/* Liste */}
      <TransactionList items={transactions} onDelete={deleteTransaction} />

    </div>
  )
}

function MetricCard({ label, value, color }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-base font-medium ${color}`}>
        ₺{Math.round(value).toLocaleString('tr-TR')}
      </p>
    </div>
  )
}