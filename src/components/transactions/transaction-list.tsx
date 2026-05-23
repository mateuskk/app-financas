'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { deleteTransaction } from '@/app/(app)/transactions/actions'
import { getCategoryLabel } from '@/lib/categories'
import { formatCurrency, formatDate } from '@/lib/format'
import type { Transaction } from '@/lib/supabase/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Pencil, Trash2 } from 'lucide-react'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [toDelete, setToDelete] = useState<Transaction | null>(null)
  const [isPending, startTransition] = useTransition()

  function confirmDelete() {
    if (!toDelete) return
    startTransition(async () => {
      const result = await deleteTransaction(toDelete.id)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Transação excluída.')
      }
      setToDelete(null)
    })
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg mb-2">Nenhuma transação encontrada.</p>
        <p className="text-sm">
          <Link href="/transactions/new" className="text-primary hover:underline">
            Adicione sua primeira transação
          </Link>
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                  {formatDate(t.date)}
                </TableCell>
                <TableCell className="font-medium">{t.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{getCategoryLabel(t.category)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={t.type === 'income' ? 'default' : 'destructive'}>
                    {t.type === 'income' ? 'Receita' : 'Despesa'}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 justify-end">
                    <Link
                      href={`/transactions/${t.id}/edit`}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-8 w-8')}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setToDelete(t)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {transactions.map((t) => (
          <div key={t.id} className="bg-card border rounded-lg p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{t.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(t.date)}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {getCategoryLabel(t.category)}
                </Badge>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`font-bold ${
                    t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </p>
                <div className="flex gap-1 justify-end mt-2">
                  <Link
                    href={`/transactions/${t.id}/edit`}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-7 w-7')}
                  >
                    <Pencil className="h-3 w-3" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => setToDelete(t)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!toDelete} onOpenChange={() => setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir transação</DialogTitle>
            <DialogDescription>
              Deseja excluir &ldquo;{toDelete?.description}&rdquo;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isPending}>
              {isPending ? 'Excluindo...' : 'Excluir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
