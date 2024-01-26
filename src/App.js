// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainView from './MainView';
import Admin from './Admin';
import Login from './Login';
import Details from './Details';

const App = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<Details />} />
            <Route path="/" element={<MainView />} />
        </Routes>
    );
};

export default App;
