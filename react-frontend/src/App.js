import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/Maincontent';
import Footer from './components/Footer';

function App() {

  const [data,setData] = useState(null);

  useEffect(()=> {
    fetch('http://127.0.0.1:5000/api/data').then(response => response.json()).then(data => setData(data));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>React and Flask Integration</h1>
        {data ? <p>{data.message}</p> : <p>Loading...</p>}
      </header>
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;