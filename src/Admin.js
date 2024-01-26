import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import MainView from './MainView';

const Admin = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            console.log('Nie stwierdzono udanego zalogowania!');
            navigate('/'); // Przekieruj na stronę główną (MainView)
        } else {
            console.log('Admin zalogowany!');
        }
    }, [isLoggedIn, navigate]);

    const [formData, setFormData] = useState({
        rodzaj: '',
        nazwaWydarzenia: '',
        iloscBiletow: 0,
        cenaBiletu: 0,
        data: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return (
            formData.rodzaj !== '' &&
            formData.nazwaWydarzenia.trim() !== '' &&
            formData.iloscBiletow > 0 &&
            formData.cenaBiletu > 0
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            console.error('Niepoprawne dane. Sprawdź formularz.');
            return;
        }

        // Dodawanie elementu do lokalnego pliku JSON
        try {
            // Pobierz aktualne dane z pliku JSON
            const response = await fetch('http://localhost:5000/api/updateItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Element dodany do lokalnego pliku JSON');
            } else {
                console.error('Błąd dodawania danych do lokalnego pliku JSON');
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania danych:', error);
        }
    };

    const handleLogout = () => {
        logout(); // Wyloguj użytkownika
        navigate('/'); // Przekieruj na stronę główną (MainView)
    };

    return (
        <div>
            <h2>Panel administracyjny</h2>
            <button onClick={handleLogout}>Wyloguj</button>
            <form onSubmit={handleSubmit}>

                <label>
                    Rodzaj:
                    <select
                        name="rodzaj"
                        value={formData.rodzaj}
                        onChange={handleInputChange}
                    >
                        <option value="">Wybierz rodzaj</option>
                        <option value="Koncert">Koncert</option>
                        <option value="Spektakl Teatralny">Spektakl Teatralny</option>
                        <option value="Wydarzenie Sportowe">Wydarzenie Sportowe</option>
                    </select>
                </label>

                <br />
                <label>
                    Nazwa wydarzenia:
                    <input
                        type="text"
                        name="nazwaWydarzenia"
                        value={formData.nazwaWydarzenia}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Ilość biletów:
                    <input
                        type="number"
                        name="iloscBiletow"
                        value={formData.iloscBiletow}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Cena biletu:
                    <input
                        type="number"
                        name="cenaBiletu"
                        value={formData.cenaBiletu}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Data:
                    <input
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                        min="2024-01-01"
                    />
                </label>
                <br />
                <br />
                <button type="submit">Dodaj element</button>
            </form>
        </div>
    );
};

export default Admin;
