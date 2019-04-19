import React from 'react';
import TypeRacer from './TypeRacer';
import 'normalize.css';
import './App.css';

const App = () => (
  <div id="page">
    <header>
      <h1>ReactRacer</h1>
    </header>

    <TypeRacer
      quote="What good are prayers and shrines to a person mad with love?
             The flame keeps gnawing into her tender marrow hour by hour,
             and deep in her heart the silent wound lives on."
    />
  </div>
);

export default App;
