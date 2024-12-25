import React from 'react';

interface HeaderProps {
  onNavClick: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  return (
    <header>
      <nav>
        <ul>
          <li onClick={() => onNavClick('expenses')} style={{ listStyleType: 'none' }}>Expenses</li>
          <li onClick={() => onNavClick('events')} style={{ listStyleType: 'none' }}>Events</li>
          <li onClick={() => onNavClick('tasks')} style={{ listStyleType: 'none' }}>Tasks</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;