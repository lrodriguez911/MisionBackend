import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  const titulo = React.createElement(
    'h1',
    {className:"App-header"},
    'La hora es:'
  )
  
  /* const element = (
    <div className="App">
      <header className="App-header">
        <titulo />
        <h1>La hora es:</h1>
        <h2>son las {new Date().toLocaleTimeString()}</h2>
      </header>
    </div>
  ) */
  root.render(titulo)
}

export default App;
