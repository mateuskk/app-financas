'use client'

import { buttonVariants } from '@/components/ui/button'
import { getCategoryLabel } from '@/lib/categories'
import type { Transaction } from '@/lib/supabase/types'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'

interface ExportCsvButtonProps {
  transactions: Transaction[]
}

const BORDER = {
  top:    { style: 'thin', color: { rgb: 'CBD5E1' } },
  bottom: { style: 'thin', color: { rgb: 'CBD5E1' } },
  left:   { style: 'thin', color: { rgb: 'CBD5E1' } },
  right:  { style: 'thin', color: { rgb: 'CBD5E1' } },
}

const HEADER_STYLE = {
  font:      { bold: true, color: { rgb: 'FFFFFF' }, sz: 11, name: 'Calibri' },
  fill:      { patternType: 'solid', fgColor: { rgb: '0F172A' } },
  alignment: { horizontal: 'center', vertical: 'center' },
  border:    BORDER,
}

function cellStyle(type: 'income' | 'expense', role: 'default' | 'type' | 'amount') {
  const bg    = type === 'income' ? 'F0FDF4' : 'FFF1F2'
  const color = type === 'income' ? '059669' : 'E11D48'
  return {
    font:      { sz: 10, name: 'Calibri', color: { rgb: role !== 'default' ? color : '1E293B' }, bold: role !== 'default' },
    fill:      { patternType: 'solid', fgColor: { rgb: bg } },
    alignment: { horizontal: role === 'amount' ? 'right' : 'left', vertical: 'center' },
    border:    BORDER,
  }
}

function totalStyle(color: string) {
  return {
    font:      { bold: true, sz: 11, name: 'Calibri', color: { rgb: color } },
    fill:      { patternType: 'solid', fgColor: { rgb: 'F8FAFC' } },
    alignment: { horizontal: 'right', vertical: 'center' },
    border:    BORDER,
  }
}

const EMPTY = { v: '', t: 's', s: { fill: { patternType: 'solid', fgColor: { rgb: 'F8FAFC' } }, border: BORDER } }

export function ExportCsvButton({ transactions }: ExportCsvButtonProps) {
  async function handleExport() {
    const mod  = await import('xlsx-js-style')
    const XLSX = (mod as any).default ?? mod

    // ── Cabeçalho ──────────────────────────────────────────────
    const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor (R$)']
    const headerRow = headers.map((v) => ({ v, t: 's', s: HEADER_STYLE }))

    // ── Linhas de dados ─────────────────────────────────────────
    const dataRows = transactions.map((t) => [
      { v: t.date,                                  t: 's', s: cellStyle(t.type, 'default') },
      { v: t.description,                           t: 's', s: cellStyle(t.type, 'default') },
      { v: getCategoryLabel(t.category),            t: 's', s: cellStyle(t.type, 'default') },
      { v: t.type === 'income' ? 'Receita' : 'Despesa', t: 's', s: cellStyle(t.type, 'type') },
      { v: t.amount, z: '#,##0.00',                 t: 'n', s: cellStyle(t.type, 'amount') },
    ])

    // ── Totais ──────────────────────────────────────────────────
    const totalIncome  = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    const balance      = totalIncome - totalExpense
    const balanceColor = balance >= 0 ? '2563EB' : 'EA580C'

    const totalsRows = [
      [EMPTY, EMPTY, EMPTY, { v: 'Total Receitas', t: 's', s: totalStyle('059669') }, { v: totalIncome,  z: '#,##0.00', t: 'n', s: totalStyle('059669') }],
      [EMPTY, EMPTY, EMPTY, { v: 'Total Despesas', t: 's', s: totalStyle('E11D48') }, { v: totalExpense, z: '#,##0.00', t: 'n', s: totalStyle('E11D48') }],
      [EMPTY, EMPTY, EMPTY, { v: 'Saldo',          t: 's', s: totalStyle(balanceColor) }, { v: balance, z: '#,##0.00', t: 'n', s: totalStyle(balanceColor) }],
    ]

    // ── Montar planilha ─────────────────────────────────────────
    const wsData = [headerRow, ...dataRows, [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], ...totalsRows]
    const ws = XLSX.utils.aoa_to_sheet(wsData)

    ws['!cols'] = [{ wch: 13 }, { wch: 38 }, { wch: 20 }, { wch: 13 }, { wch: 16 }]
    ws['!rows'] = [{ hpt: 22 }]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Transações')

    const date = new Date().toISOString().slice(0, 10)
    XLSX.writeFile(wb, `transacoes_${date}.xlsx`)
  }

  return (
    <button
      onClick={handleExport}
      disabled={transactions.length === 0}
      className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
    >
      <Download className="h-4 w-4" />
      Exportar Excel
    </button>
  )
}
