import {
  CreateExpenseSchema,
  type CreateExpenseInput,
} from "@expense-tracker/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ExpenseFormProps {
  onSubmit: (data: CreateExpenseInput) => void;
  isLoading: boolean;
}

export default function ExpenseForm({ onSubmit, isLoading }: ExpenseFormProps) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input
        type="text"
        placeholder="Short description"
        {...register("description")}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        {...register("amount", { valueAsNumber: true })}
      />
      <input type="date" {...register("date")} />
      <select {...register("category")}>
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
      </select>
      <select {...register("paymentMethod")}>
        <option value="">Select payment method</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Bank">Bank</option>
      </select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}

