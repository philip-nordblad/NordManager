import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axiosInstance.get('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}: {task.completed ? 'Completed' : 'Incomplete'}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;