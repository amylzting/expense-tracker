import type { CreateExpenseInput, Expense } from "@expense-tracker/shared";
import { useState, useEffect } from "react";
import api from "../api";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";

export default function Expenses() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [isCreatingExpense, setIsCreatingExpense] = useState(false);

  useEffect(() => {
    api
      .get("/expenses")
      .then((res) => setExpenseList(res.data))
      .catch((err) => console.error("Failed to fetch expenses:", err));
  }, []);

  async function handleDelete(id: string) {
    try {
      await api.delete(`/expenses/${id}`);
      // Re-fetch and set expense list
      try {
        const res = await api.get("/expenses");
        setExpenseList(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    } catch (err) {
      console.error(`Failed to delete expense ${id}:`, err);
    }
  }

  async function handleSubmit(input: CreateExpenseInput) {
    try {
      setIsCreatingExpense(true);
      await api.post("/expenses", input);

      // Re-fetch and set expense list
      try {
        const res = await api.get("/expenses");
        setExpenseList(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    } catch (err) {
      console.error("Failed to add expense:", err);
    } finally {
      setIsCreatingExpense(false);
    }
  }

  return (
    <div>
      <h1>Expenses</h1>
      <ExpenseForm
        onSubmit={handleSubmit}
        isLoading={isCreatingExpense}
      ></ExpenseForm>
      {expenseList.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
