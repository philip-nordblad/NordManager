import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Expenses from './components/Expenses';
import Events from './components/Events';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import Login from './components/sign-up/Login';
import SignUp from './components/sign-up/SignUp';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

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
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/login" />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={
        <>
          <Header onNavClick={setCurrentView} />
          <main>
          {renderContent()}
          </main>
          <Footer />
        </>
        } />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
