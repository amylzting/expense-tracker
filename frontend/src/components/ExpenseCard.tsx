import type { Expense } from "@expense-tracker/shared";

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  return (
    <div>
      <p>{expense.description}</p>
      <p>${expense.amount}</p>
      <p>{expense.category}</p>
      <p>{expense.date}</p>
      <p>{expense.paymentMethod}</p>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
}
