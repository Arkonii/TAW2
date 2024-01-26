// Details.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
    const location = useLocation();
    const eventIdMemory = location.state.eventId;

    const navigate = useNavigate();
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        fetchEventData();
    }, []);

    const fetchEventData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getItems');
            if (response.ok) {
                const data = await response.json();
                setEventsData(data);
            } else {
                console.error('Błąd podczas pobierania danych');
            }
        } catch (error) {
            console.error('Wystąpił błąd:', error);
        }
    };

    const event = eventsData.find((event) => event.id === eventIdMemory.id);

    return (
        <div>
            <h2>Sklep Biletowy</h2>
            {event ? (
                <div key={event.id}>
                    <p>Rodzaj: {event.rodzaj}</p>
                    <p>Nazwa wydarzenia: {event.nazwaWydarzenia}</p>
                    <p>Ilość biletów: {event.iloscBiletow}</p>
                    <p>Cena biletu: {event.cenaBiletu} zł</p>
                    <p>Data: {event.data}</p>
                    <hr />
                </div>
            ) : (
                <p>Brak danych dla wydarzenia o id: {eventIdMemory.id}</p>
            )}
        </div>
    );
};

export default Details;
