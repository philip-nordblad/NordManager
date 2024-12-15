import React, { useEffect, useState } from 'react';

function Events() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', location: '', date: '' });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/events')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then(response => response.json())
      .then(data => setEvents([...events, data]));
  };

  return (
    <div>
      <h2>Events</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={newEvent.title} onChange={handleChange} />
        <input name="location" placeholder="Location" value={newEvent.location} onChange={handleChange} />
        <input name="date" placeholder="Date" value={newEvent.date} onChange={handleChange} />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title} - {event.location} - {event.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default Events;