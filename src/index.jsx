import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import Tailwind CSS
import App from './App'; // Import the main component

const container = document.getElementById('root');
const root = createRoot(container);

// This renders your main App component into the HTML container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);