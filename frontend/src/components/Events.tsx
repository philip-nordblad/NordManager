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
    axiosInstance.get('/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance.post('/events', {name, date})
      .then(response => {
      setEvents([...events, response.data]);
      setName('');
      setDate('');

    })
    .catch(error => {
      console.error("There was an erro adding the event!", error);
    });
  };

  const handleDelete = (id: number) =>  {
    axiosInstance.delete(`/events/${id}`)
    .then(() => {
      setEvents(events.filter(events => events.id !== id));
    })
    .catch(error => {
      console.log("There was an error deleting the event", error);
    });
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