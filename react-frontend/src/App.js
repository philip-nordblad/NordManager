import React from 'react';
import './App.css';
import Header from './components/Header';
import Events from './components/Events';
import Expenses from './components/Expenses';
import Tasks from './components/Tasks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Events />
        <Expenses />
        <Tasks />
      </main>
      <Footer />
    </div>
  );
}

export default App;