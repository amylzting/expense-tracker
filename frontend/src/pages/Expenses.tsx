import type { Expense } from "@expense-tracker/shared";
import { useState, useEffect } from "react";
import api from "../api";

export default function Expenses() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);

  useEffect(() => {
    api
      .get("/expenses")
      .then((res) => setExpenseList(res.data))
      .catch((err) => console.error("Failed to fetch expenses:", err));
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      <pre>{JSON.stringify(expenseList, null, 2)}</pre>
    </div>
  );
}
