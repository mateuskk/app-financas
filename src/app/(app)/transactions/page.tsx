import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TransactionList } from '@/components/transactions/transaction-list'
import { TransactionFilters } from '@/components/transactions/transaction-filters'
import { buttonVariants } from '@/components/ui/button'
import type { Transaction } from '@/lib/supabase/types'
import { PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TransactionsPageProps {
  searchParams: Promise<{
    month?: string
    year?: string
    type?: string
    category?: string
  }>
}

export default async function TransactionsPage({ searchParams }: TransactionsPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any)
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (params.month && params.year) {
    const year = params.year
    const month = params.month.padStart(2, '0')
    query = query.gte('date', `${year}-${month}-01`).lte('date', `${year}-${month}-31`)
  } else if (params.month) {
    const month = params.month.padStart(2, '0')
    query = query.like('date', `%-${month}-%`)
  } else if (params.year) {
    query = query.like('date', `${params.year}-%`)
  }

  if (params.type === 'income' || params.type === 'expense') {
    query = query.eq('type', params.type)
  }

  if (params.category) {
    query = query.eq('category', params.category)
  }

  const { data } = await query
  const transactions = (data ?? []) as Transaction[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Transações</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {transactions.length} transação(ões) encontrada(s)
          </p>
        </div>
        <Link href="/transactions/new" className={cn(buttonVariants())}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nova transação
        </Link>
      </div>

      <Suspense>
        <TransactionFilters />
      </Suspense>

      <TransactionList transactions={transactions} />
    </div>
  )
}
