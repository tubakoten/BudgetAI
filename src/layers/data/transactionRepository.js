// src/layers/data/transactionRepository.js
import { supabase } from './supabaseClient';

/**
 * Kullanıcının belirli bir aydaki işlemlerini getirir.
 * RLS sayesinde yalnızca oturumdaki kullanıcının verisi döner.
 */
export async function fetchTransactionsByMonth(userId, year, month) {
  const from = `${year}-${String(month).padStart(2, '0')}-01`;
  const to   = `${year}-${String(month).padStart(2, '0')}-31`;

  const { data, error } = await supabase
    .from('transactions')
    .select('*, categories(name, color_hex)')
    .eq('user_id', userId)
    .gte('transaction_date', from)
    .lte('transaction_date', to)
    .order('transaction_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

/** Yeni işlem ekler. */
export async function insertTransaction(transaction) {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

/** İşlemi siler (undo desteği için id döner). */
export async function deleteTransaction(id) {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}