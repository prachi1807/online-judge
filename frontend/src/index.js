import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ProblemsListContextProvider } from './context/ProblemListContext';
import { ProblemsContextProvider } from './context/ProblemContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProblemsListContextProvider>
        <ProblemsContextProvider>
          <App />
        </ProblemsContextProvider>
      </ProblemsListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
