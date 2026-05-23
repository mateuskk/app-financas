import type { Category, TransactionType } from './supabase/types'

export const INCOME_CATEGORIES: { value: Category; label: string }[] = [
  { value: 'salary', label: 'Salário' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'investment', label: 'Investimentos' },
  { value: 'other_income', label: 'Outras receitas' },
]

export const EXPENSE_CATEGORIES: { value: Category; label: string }[] = [
  { value: 'housing', label: 'Moradia' },
  { value: 'food', label: 'Alimentação' },
  { value: 'transport', label: 'Transporte' },
  { value: 'health', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'entertainment', label: 'Lazer' },
  { value: 'clothing', label: 'Vestuário' },
  { value: 'other_expense', label: 'Outras despesas' },
]

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]

export function getCategoriesForType(type: TransactionType) {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}

export function getCategoryLabel(value: Category): string {
  return ALL_CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export const CATEGORY_COLORS: Record<Category, string> = {
  salary: '#3b82f6',
  freelance: '#8b5cf6',
  investment: '#10b981',
  other_income: '#06b6d4',
  housing: '#f59e0b',
  food: '#ef4444',
  transport: '#f97316',
  health: '#ec4899',
  education: '#6366f1',
  entertainment: '#84cc16',
  clothing: '#a855f7',
  other_expense: '#94a3b8',
}
