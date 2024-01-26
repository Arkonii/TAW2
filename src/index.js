// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Popraw ścieżkę w zależności od struktury projektu
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>
);
