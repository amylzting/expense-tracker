import { z } from 'zod';

export const CreateExpenseSchema = z.object({
  description: z.string()
    .min(1, { message: 'Description is required' })
    .max(200, { message: 'Description cannot exceed 200 characters' }),
  amount: z.number()
    .positive({ message: 'Amount must be a positive number' })
    .finite({ message: 'Amount must be a finite number' }),
  category: z.string()
    .min(1, { message: 'Category is required' }),
  date: z.string()
    .refine(val => !isNaN(new Date(val).getTime()), { message: 'Invalid date format' }),
  paymentMethod: z.string()
    .min(1, { message: 'Payment method is required' })
}).strict()

export const UpdateExpenseSchema = CreateExpenseSchema.partial()

export const StoredExpenseSchema = CreateExpenseSchema.extend({
  id: z.uuid()
})

export type Expense = z.infer<typeof StoredExpenseSchema>