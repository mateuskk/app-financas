'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createTransaction, updateTransaction } from '@/app/(app)/transactions/actions'
import { getCategoriesForType } from '@/lib/categories'
import { toDateInputValue } from '@/lib/format'
import type { Transaction, TransactionType, Category } from '@/lib/supabase/types'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

interface TransactionFormProps {
  transaction?: Transaction
}

export function TransactionForm({ transaction }: TransactionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<TransactionType>(transaction?.type ?? 'expense')
  const [category, setCategory] = useState<string>(transaction?.category ?? '')

  const categories = getCategoriesForType(type)
  const defaultDate = transaction?.date ?? toDateInputValue(new Date())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const data = {
      type: form.get('type') as TransactionType,
      amount: parseFloat(form.get('amount') as string),
      description: form.get('description') as string,
      category: form.get('category') as Category,
      date: form.get('date') as string,
    }

    const result = transaction
      ? await updateTransaction(transaction.id, data)
      : await createTransaction(data)

    if (result?.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }

    toast.success(transaction ? 'Transação atualizada!' : 'Transação criada!')
    router.push('/transactions')
  }

  return (
    <div className="max-w-xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-1"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{transaction ? 'Editar transação' : 'Nova transação'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tipo */}
            <div className="space-y-2">
              <Label>Tipo</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setType('income'); setCategory('') }}
                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    type === 'income'
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'border-input bg-background hover:bg-muted'
                  }`}
                >
                  Receita
                </button>
                <button
                  type="button"
                  onClick={() => { setType('expense'); setCategory('') }}
                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    type === 'expense'
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-input bg-background hover:bg-muted'
                  }`}
                >
                  Despesa
                </button>
              </div>
              <input type="hidden" name="type" value={type} />
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                defaultValue={transaction?.amount}
                required
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                name="description"
                placeholder="Ex: Aluguel, Salário, Mercado..."
                defaultValue={transaction?.description}
                required
              />
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                name="category"
                value={category}
                onValueChange={(v) => v && setCategory(v)}
                required
              >
                <SelectTrigger>
                  <span className={`flex-1 text-left text-sm truncate ${!category ? 'text-muted-foreground' : ''}`}>
                    {category
                      ? (categories.find((c) => c.value === category)?.label ?? category)
                      : 'Selecione uma categoria'}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {categories.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data */}
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={defaultDate}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? transaction
                  ? 'Salvando...'
                  : 'Criando...'
                : transaction
                  ? 'Salvar alterações'
                  : 'Criar transação'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
