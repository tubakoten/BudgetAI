export function calculateBudgetSummary(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    totalIncome,
    totalExpense,
    remaining: totalIncome - totalExpense,
    usageRatio: totalIncome > 0 ? totalExpense / totalIncome : 0,
  }
}

export function groupExpensesByCategory(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.cat] = (acc[t.cat] || 0) + t.amount
      return acc
    }, {})
}