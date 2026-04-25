const CAT_COLORS = {
    Kira: 'bg-blue-100 text-blue-700',
    Market: 'bg-emerald-100 text-emerald-700',
    Ulaşım: 'bg-amber-100 text-amber-700',
    Eğlence: 'bg-pink-100 text-pink-700',
    Sağlık: 'bg-purple-100 text-purple-700',
    Diğer: 'bg-gray-100 text-gray-700',
  }
  
  export default function TransactionList({ items, onDelete }) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-600 mb-3">Son işlemler</p>
        <div className="space-y-2">
          {items.slice(0, 8).map(t => (
            <div key={t.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${CAT_COLORS[t.cat] || CAT_COLORS['Diğer']}`}>
                  {t.cat}
                </span>
                <span className="text-sm text-gray-700">{t.desc}</span>
                <span className="text-xs text-gray-400">{t.date?.slice(5)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}₺{t.amount.toLocaleString('tr-TR')}
                </span>
                <button onClick={() => onDelete(t.id)}
                  className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 rounded px-1.5 py-0.5">
                  sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }