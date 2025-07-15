/**
 * Entry point of the React application.
 * 
 * Sets up:
 * - React Strict Mode for highlighting potential problems
 * - React Router's BrowserRouter for client-side routing
 * - ToastProvider for global toast notifications
 * - Main App component rendering inside the root DOM node
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './output.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
