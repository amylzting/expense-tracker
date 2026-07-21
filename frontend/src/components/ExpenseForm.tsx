import { useState } from "react";
import axios from "axios";
import api from "../api";

export default function ExpenseForm() {
  // Benefits for using useState here
  // 1. Live validation of user input
  // 2. Can clear the form after submit
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const parsedAmount = parseFloat(parseFloat(amount).toFixed(2));
    console.log({
      description,
      amount: parsedAmount,
      category,
      date,
      paymentMethod,
    });

    setIsLoading(true);

    try {
      await api.post("/expenses", {
        description,
        amount: parsedAmount,
        category,
        date,
        paymentMethod,
      });

      // Clear the form after submit
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("");
      setPaymentMethod("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Validation errors:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <input
        type="number"
        step="0.01"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      ></input>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      ></input>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
      </select>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
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
