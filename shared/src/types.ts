import { type z } from 'zod'
import { StoredExpenseSchema } from './schemas.js'

export type Expense = z.infer<typeof StoredExpenseSchema>