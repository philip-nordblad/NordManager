import React, { useEffect, useState } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', deadline: '' });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={newTask.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={newTask.description} onChange={handleChange} />
        <input name="deadline" placeholder="Deadline" value={newTask.deadline} onChange={handleChange} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name} - {task.description} - {task.deadline}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;