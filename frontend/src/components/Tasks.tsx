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
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.log("There was an errro fetching the expenses", error);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/tasks', {name,completed});
      setTasks([...tasks,response.data]);
      setName('');
      setCompleted(false);
    } catch (error) {
      console.log("There was an error adding the expense",error);
      }
    };





  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));

    } catch (error) {
      console.log("There was an error deleting the task", error);
    }
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
          <li key={task.id}>{task.name}: {task.completed ? 'Completed' : 'Incomplete'}
          <button className= "deleteButton" onClick={() => handleDelete(task.id)}>Delete</button></li>

        ))}
      </ul>
    </div>
  );
};

export default Tasks;