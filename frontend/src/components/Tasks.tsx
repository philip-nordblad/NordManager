import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import './sharedStyles.css'

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    axiosInstance.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance.post('/tasks', { name, completed })
      .then(response => {
        setTasks([...tasks, response.data]);
        setName('');
        setCompleted(false);
      })
      .catch(error => {
        console.error('There was an error adding the task!', error);
      });
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}: {task.completed ? 'Completed' : 'Incomplete'}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;