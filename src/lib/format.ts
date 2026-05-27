export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

export function toDateInputValue(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function getMonthName(month: number): string {
  return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
    new Date(2000, month - 1, 1)
  )
}
