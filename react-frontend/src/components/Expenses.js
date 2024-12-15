import React, { useEffect, useState } from 'react';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', cost: '', deadline: '', date: '' });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    })
      .then(response => response.json())
      .then(data => setExpenses([...expenses, data]));
  };

  return (
    <div>
      <h2>Expenses</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={newExpense.name} onChange={handleChange} />
        <input name="cost" placeholder="Cost" value={newExpense.cost} onChange={handleChange} />
        <input name="deadline" placeholder="Deadline" value={newExpense.deadline} onChange={handleChange} />
        <input name="date" placeholder="Date" value={newExpense.date} onChange={handleChange} />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense.name} - ${expense.cost} - {expense.deadline} - {expense.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;