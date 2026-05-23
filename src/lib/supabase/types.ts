export type TransactionType = 'income' | 'expense'

export type Category =
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other_income'
  | 'housing'
  | 'food'
  | 'transport'
  | 'health'
  | 'education'
  | 'entertainment'
  | 'clothing'
  | 'other_expense'

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  description: string
  category: Category
  date: string
  created_at: string
  updated_at: string
}

export interface TransactionInsert {
  type: TransactionType
  amount: number
  description: string
  category: Category
  date: string
}

export interface TransactionUpdate {
  type?: TransactionType
  amount?: number
  description?: string
  category?: Category
  date?: string
}

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: Transaction
        Insert: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
