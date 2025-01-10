import React from 'react';
import './Header.modules.css'

interface HeaderProps {
  onNavClick: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  return (
    <header>
      <nav>
        <ul className='navBar'>
            <li onClick={() => onNavClick('expenses')}>Expenses</li>
            <li onClick={() => onNavClick('events')}>Events</li>
            <li onClick={() => onNavClick('tasks')}>Tasks</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;