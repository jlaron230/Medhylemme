import React from 'react';
import { createRoot } from 'react-dom/client'; // Importer createRoot au lieu de ReactDOM.render
import App from './App.jsx';
import './index.css';

// Sélectionner le conteneur où l'application sera rendue
const container = document.getElementById('root');

// Créer une racine avec la nouvelle API createRoot
const root = createRoot(container);

// Utiliser root.render pour rendre l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
