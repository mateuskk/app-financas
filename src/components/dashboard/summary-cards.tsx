import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react'

interface SummaryCardsProps {
  totalIncome: number
  totalExpense: number
  balance: number
}

export function SummaryCards({ totalIncome, totalExpense, balance }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Receitas
          </CardTitle>
          <div className="bg-emerald-100 dark:bg-emerald-950 p-2 rounded-lg">
            <ArrowUpCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalIncome)}</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Despesas
          </CardTitle>
          <div className="bg-rose-100 dark:bg-rose-950 p-2 rounded-lg">
            <ArrowDownCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{formatCurrency(totalExpense)}</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo do Período
          </CardTitle>
          <div className={`p-2 rounded-lg ${balance >= 0 ? 'bg-blue-100 dark:bg-blue-950' : 'bg-orange-100 dark:bg-orange-950'}`}>
            <Wallet className={`h-4 w-4 ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
          </div>
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}
          >
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
