'use client'

import { buttonVariants } from '@/components/ui/button'
import { getCategoryLabel } from '@/lib/categories'
import type { Transaction } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'

interface ExportCsvButtonProps {
  transactions: Transaction[]
}

export function ExportCsvButton({ transactions }: ExportCsvButtonProps) {
  function handleExport() {
    const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor (R$)']

    const rows = transactions.map((t) => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      getCategoryLabel(t.category),
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.amount.toFixed(2).replace('.', ','),
    ])

    // Separador ';' e BOM UTF-8 para abrir corretamente no Excel em pt-BR
    const csv = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transacoes_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      disabled={transactions.length === 0}
      className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
    >
      <Download className="h-4 w-4" />
      Exportar CSV
    </button>
  )
}
