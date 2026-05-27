import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { CategoryChart } from '@/components/dashboard/category-chart'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'
import { PeriodSelector } from '@/components/dashboard/period-selector'
import { getMonthName } from '@/lib/format'
import type { Transaction, Category } from '@/lib/supabase/types'

interface DashboardPageProps {
  searchParams: Promise<{ month?: string; year?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams
  const now = new Date()
  const month = params.month ?? String(now.getMonth() + 1).padStart(2, '0')
  const year = params.year ?? String(now.getFullYear())

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const monthPadded = month.padStart(2, '0')
  const dateFrom = `${year}-${monthPadded}-01`
  const dateTo = `${year}-${monthPadded}-31`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', dateFrom)
    .lte('date', dateTo)
    .order('date', { ascending: false })

  const allTransactions = (data ?? []) as Transaction[]

  const totalIncome = allTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = allTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const expenseByCategory = allTransactions
    .filter((t) => t.type === 'expense')
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount
      return acc
    }, {})

  const incomeByCategory = allTransactions
    .filter((t) => t.type === 'income')
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount
      return acc
    }, {})

  const chartData = Object.entries(expenseByCategory)
    .map(([category, total]) => ({ category: category as Category, total }))
    .sort((a, b) => b.total - a.total)

  const incomeChartData = Object.entries(incomeByCategory)
    .map(([category, total]) => ({ category: category as Category, total }))
    .sort((a, b) => b.total - a.total)

  const recentTransactions = allTransactions.slice(0, 8)
  const monthName = getMonthName(parseInt(monthPadded))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5 capitalize">
            {monthName} de {year}
          </p>
        </div>
        <Suspense>
          <PeriodSelector month={monthPadded} year={year} />
        </Suspense>
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryChart title="Despesas por categoria" emptyMessage="Nenhuma despesa no período" data={chartData} />
        <CategoryChart title="Receitas por categoria" emptyMessage="Nenhuma receita no período" data={incomeChartData} />
      </div>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  )
}
