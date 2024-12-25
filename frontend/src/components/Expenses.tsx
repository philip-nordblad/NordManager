import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

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
    axiosInstance.get('/expenses')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the expenses!', error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance.post('/expenses', { title, amount: parseFloat(amount) })
      .then(response => {
        setExpenses([...expenses, response.data]);
        setTitle('');
        setAmount('');
      })
      .catch(error => {
        console.error('There was an error adding the expense!', error);
      });
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
          <li key={expense.id}>{expense.title}: ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;