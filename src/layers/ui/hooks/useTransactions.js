// src/layers/ui/hooks/useTransactions.js
import { useState, useEffect, useCallback } from 'react';
import { fetchTransactionsByMonth, insertTransaction, deleteTransaction }
  from '../../data/transactionRepository';
import { supabase } from '../../data/supabaseClient';

/**
 * İşlem CRUD işlemlerini ve geri alma (undo) mekanizmasını yönetir.
 * İş mantığı budgetService.js'de; bu hook yalnızca state yönetir.
 */
export function useTransactions(year, month) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [undoBuffer, setUndoBuffer]     = useState(null); // Silinecek işlem tamponu

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      const data = await fetchTransactionsByMonth(user.id, year, month);
      setTransactions(data);
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => { load(); }, [load]);

  const add = async (txPayload) => {
    const { data: { user } } = await supabase.auth.getUser();
    const newTx = await insertTransaction({ ...txPayload, user_id: user.id });
    setTransactions(prev => [newTx, ...prev]);
  };

  const remove = async (id) => {
    const target = transactions.find(t => t.id === id);
    setUndoBuffer(target);
    setTransactions(prev => prev.filter(t => t.id !== id));
    await deleteTransaction(id);
    // 5 saniye sonra undo fırsatını kapat
    setTimeout(() => setUndoBuffer(null), 5000);
  };

  // Geri Al — silinen işlemi geri ekle
  const undo = async () => {
    if (!undoBuffer) return;
    const restored = await insertTransaction(undoBuffer);
    setTransactions(prev => [restored, ...prev].sort(
      (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
    ));
    setUndoBuffer(null);
  };

  return { transactions, loading, add, remove, undo, undoBuffer };
}