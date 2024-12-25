import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

interface Event {
  id: number;
  name: string;
  date: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axiosInstance.get('/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}: {event.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;