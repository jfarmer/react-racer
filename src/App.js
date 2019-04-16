import React from 'react';
import TypeRacer from './TypeRacer.js';
import 'normalize.css';
import './App.css';

const App = () => {
  return (
    <div id="page">
      <header>
        <h1>ReactRacer</h1>
      </header>

      <TypeRacer />
    </div>
  );
}

export default App;
