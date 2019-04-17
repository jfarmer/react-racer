import React from 'react';
import TypeRacer from './TypeRacer';
import 'normalize.css';
import './App.css';

const App = () => (
  <div id="page">
    <header>
      <h1>ReactRacer</h1>
    </header>

    <TypeRacer quote="She sells sea shells by the sea shore." />
  </div>
);

export default App;
