'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { buttonVariants } from '@/components/ui/button'
import { ALL_CATEGORIES } from '@/lib/categories'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const MONTHS = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i)

const TYPE_LABELS: Record<string, string> = {
  income: 'Receitas',
  expense: 'Despesas',
}

export function TransactionFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const monthValue = searchParams.get('month') ?? 'all'
  const yearValue = searchParams.get('year') ?? 'all'
  const typeValue = searchParams.get('type') ?? 'all'
  const categoryValue = searchParams.get('category') ?? 'all'

  const monthLabel = monthValue === 'all'
    ? 'Todos os meses'
    : (MONTHS.find((m) => m.value === monthValue)?.label ?? monthValue)

  const yearLabel = yearValue === 'all' ? 'Todos os anos' : yearValue

  const typeLabel = typeValue === 'all' ? 'Todos os tipos' : (TYPE_LABELS[typeValue] ?? typeValue)

  const categoryLabel = categoryValue === 'all'
    ? 'Todas as categorias'
    : (ALL_CATEGORIES.find((c) => c.value === categoryValue)?.label ?? categoryValue)

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/transactions?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearFilters = () => router.push('/transactions')
  const hasFilters = searchParams.toString() !== ''

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Select
        value={monthValue}
        onValueChange={(v) => updateFilter('month', v)}
      >
        <SelectTrigger className="w-40 bg-card">
          <span className="flex-1 text-left text-sm truncate">{monthLabel}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os meses</SelectItem>
          {MONTHS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={yearValue}
        onValueChange={(v) => updateFilter('year', v)}
      >
        <SelectTrigger className="w-32 bg-card">
          <span className="flex-1 text-left text-sm truncate">{yearLabel}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os anos</SelectItem>
          {YEARS.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={typeValue}
        onValueChange={(v) => updateFilter('type', v)}
      >
        <SelectTrigger className="w-36 bg-card">
          <span className="flex-1 text-left text-sm truncate">{typeLabel}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os tipos</SelectItem>
          <SelectItem value="income">Receitas</SelectItem>
          <SelectItem value="expense">Despesas</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={categoryValue}
        onValueChange={(v) => updateFilter('category', v)}
      >
        <SelectTrigger className="w-48 bg-card">
          <span className="flex-1 text-left text-sm truncate">{categoryLabel}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {ALL_CATEGORIES.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1.5')}
        >
          <X className="h-3.5 w-3.5" />
          Limpar filtros
        </button>
      )}
    </div>
  )
}
