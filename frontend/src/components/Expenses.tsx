import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import './Expenses.modules.css'
import './sharedStyles.css'

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

  const handleDelete = (id: number) => {
    axiosInstance.delete(`/expenses/${id}`)
    .then(() => {
      setExpenses(expenses.filter(expense => expense.id !== id));

    })
    .catch(error => {
      console.log("There was an error deleting the expense",error)
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
            <li className="expenseRow" key={expense.id}>
            {expense.title}: ${expense.amount}
            <button className='deleteButton' onClick={() => handleDelete(expense.id)}>Delete</button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;