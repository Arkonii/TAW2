import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {AuthProvider, useAuth} from './AuthContext';
import Admin from './Admin';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                login(token);

                console.log(data);

                navigate('/admin');

            } else {
                console.error('Błędne dane logowania');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas logowania', error);
        }
    };
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Logowanie</h2>
            <label>Login:</label>
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
            />

            <label>Hasło:</label>
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />

            <button onClick={handleLogin}>Zaloguj</button>
        </div>
    );
};

export default Login;
