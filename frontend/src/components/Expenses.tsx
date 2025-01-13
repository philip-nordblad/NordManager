import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './Expenses.modules.css';

interface Expense {
  id: number;
  title: string;
  amount: number;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axiosInstance.get('/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.log("There was an error fetching the expenses", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/expenses', { title, amount: parseFloat(amount) });
      setExpenses([...expenses, response.data]); // Update the state with the new expense
      setTitle('');
      setAmount('');
    } catch (error) {
      console.log("There was an error adding the expense", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id)); // Update the state to remove the deleted expense
    } catch (error) {
      console.log("There was an error deleting the expense", error);
    }
  };

  return (
    <div>
      <h2>Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map(expense => (
          <li className="expenseRow" key={expense.id}>
            {expense.title}: ${expense.amount}
            <button className="deleteButton" onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;