import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

// Utilisation de ReactDOM.render pour créer un rendu dans la racine de l'application
ReactDOM.render(
  // Utilisation de React.StrictMode pour repérer les problèmes potentiels dans l'application
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Le point d'ancrage où l'application React sera rendue dans le HTML
);