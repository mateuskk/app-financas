import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TransactionForm } from '@/components/transactions/transaction-form'
import type { Transaction } from '@/lib/supabase/types'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTransactionPage({ params }: EditPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('transactions')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!data) notFound()

  return <TransactionForm transaction={data as Transaction} />
}
