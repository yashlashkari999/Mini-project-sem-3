import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SkillBarterProvider } from './context/SkillBarterContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkillBarterProvider>
      <App />
    </SkillBarterProvider>
  </React.StrictMode>
);
