import { useState } from 'react'

const CATEGORIES = ['Market', 'Ulaşım', 'Eğlence', 'Sağlık', 'Kira', 'Diğer']

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [cat, setCat] = useState('Market')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!desc.trim()) { setError('Açıklama boş olamaz.'); return }
    const amt = parseFloat(amount.toString().replace(',', '.'))
    if (!amount || isNaN(amt) || amt <= 0) { setError('Geçerli bir miktar girin.'); return }
    if (!date) { setError('Tarih seçin.'); return }
    setError('')
    onAdd({ type, desc, amount: amt, cat, date })
    setDesc('')
    setAmount('')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-600 mb-3">Yeni işlem ekle</p>

      {/* Tip seçimi */}
      <div className="flex gap-2 mb-3">
        {['expense', 'income'].map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              type === t ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
            {t === 'expense' ? 'Gider' : 'Gelir'}
          </button>
        ))}
      </div>

      {/* Form alanları */}
      <div className="flex flex-wrap gap-2">
        <input value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Açıklama" className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm flex-1 min-w-32" />
        <input 
  value={amount} 
  onChange={e => setAmount(e.target.value)}
  placeholder="Miktar (örn: 70000)" 
  type="number" 
  min="0"
  step="1"
  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-28" 
/>
        <select value={cat} onChange={e => setCat(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input value={date} onChange={e => setDate(e.target.value)}
          type="date" className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm" />
        <button onClick={handleSubmit}
          className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all">
          Ekle
        </button>
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  )
}