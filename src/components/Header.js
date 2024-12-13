import React from 'react';

function Header({ onNavClick }) {
  return (
    <header>
      <h1>NordMate</h1>
      <nav>
        <ul>
          <li onClick={() => onNavClick('expenses')}>Expenses</li>
          <li onClick={() => onNavClick('events')}>Events</li>
          <li onClick={() => onNavClick('tasks')}>Tasks</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;