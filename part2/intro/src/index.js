import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import axios from 'axios'

axios.get('http://localhost:3001/notes')



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
