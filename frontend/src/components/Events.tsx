import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import './sharedStyles.css'

interface Event {
  id: number;
  name: string;
  date: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [name,setName] = useState('');
  const [date,setDate] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.log("There was an error fetching the event", error);
      }
    };
    fetchTasks();

  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/events", {name, date});
      setEvents([...events,response.data]);
      setName('');
      setDate('');
    } catch (error) {
      console.log("There was an error adding the event", error);
    }
  };

  const handleDelete = async (id: number) =>  {
    try {
      await axiosInstance.delete(`/events/${id}`);
      setEvents(events.filter(event => event.id !== id));

    } catch (error) {
      console.log("There was an erro deleting the event", error);
    }
  };
  
  return (
    <div>
      <h2>Events</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Title' value={name} onChange={(e) => setName(e.target.value)}
        required />
        <input type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required />
              <button type='submit'>Add Event</button>
      </form>


      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}: {event.date}
          <button className='deleteButton' onClick={() => handleDelete(event.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default Events;