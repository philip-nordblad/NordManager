import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Expenses from './components/Expenses';
import Events from './components/Events';
import Tasks from './components/Tasks';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState('expenses');

  const renderContent = () => {
    switch (currentView) {
      case 'expenses':
        return <Expenses />;
      case 'events':
        return <Events />;
      case 'tasks':
        return <Tasks />;
      default:
        return <Expenses />;
    }
  };

  return (
    <div className="App">
      <Header onNavClick={setCurrentView} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;