import React from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/Maincontent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;