import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CreateExpenseSchema, UpdateExpenseSchema, type Expense } from './schemas.js';

const app = express()

app.use(express.json())

// Allow frontend to call endpoints
app.use(cors({
  origin: 'http://localhost:5173'
}))

const PORT = 3000

let expenses: Expense[] = [
  {
    id: uuidv4(),
    description: 'Lunch at café',
    amount: 12.50,
    category: 'Food',
    date: '2026-06-07',
    paymentMethod: 'Cash'
  }
]

// GET all expenses
app.get('/expenses', (req: Request, res: Response) => {
  // 200 Get successfully
  res.json(expenses)
})

// GET expense by id
app.get('/expenses/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const expense = expenses.find(e => e.id === id);

  // 404 Expense not found
  if(!expense) return res.status(404).json({message: "Expense not found"});

  // 200 Get successfully
  res.json(expense)
})

// POST an expense
app.post('/expenses', (req: Request, res: Response) => {

  const result = CreateExpenseSchema.safeParse(req.body);

  // 400 Validation failed
  if(!result.success) return res.status(400).json({errors: result.error.issues})

  const {description, amount, category, date, paymentMethod} = result.data;

  const expenseToAdd: Expense = {
    id: uuidv4(),
    description: description,
    amount,
    category: category,
    date: date,
    paymentMethod: paymentMethod
  }

  expenses.push(expenseToAdd);

  // 201 Created successfully, show expense added
  res.status(201).json(expenseToAdd);
})

// UPDATE an expense by id
app.put('/expenses/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  // This is a pointer to expense object, in Javascript / Typescript objects always passed by reference
  // const does not make it immutable, its makes it unassignable
  const expense = expenses.find(e => e.id === id);

  // 404 Expense not found
  if(!expense) return res.status(404).json({message: "Expense not found"});

  // 400 Validation failed
  const result = UpdateExpenseSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({error: result.error.issues});

  const { description, amount, category, date, paymentMethod } = result.data;
  if (description) expense.description = description
  if (amount) expense.amount = amount
  if (category) expense.category = category
  if (date) expense.date = date
  if (paymentMethod) expense.paymentMethod = paymentMethod
  res.json(expense);
})

// DELETE an expense by id
app.delete('/expenses/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const expense = expenses.find(e => e.id === id);
  
  // 404 Expense not found - guard clause
  if(!expense) return res.status(404).json({message: "Expense not found"});

  // 200 Expense found, delete expense
  expenses = expenses.filter(e => e.id !== id);
  res.status(200).json(expenses);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})