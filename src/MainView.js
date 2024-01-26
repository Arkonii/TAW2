import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainView = () => {
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(1);
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

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    const handleTicketChange = (event) => {
        setNumberOfTickets(parseInt(event.target.value, 10));
    };
    const updateExistingItems = async (updatedEventData) => {
        try {
            const response = await fetch('http://localhost:5000/api/updateExistingItems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEventData),
            });

            if (!response.ok) {
                throw new Error('Błąd podczas aktualizacji danych');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Błąd podczas aktualizacji danych:', error);
            throw error;
        }
    };

    const handleBuyTickets = async (eventIndex) => {
        try {
            // Pobierz wydarzenie z bazy danych na podstawie indeksu
            const selectedEvent = eventsData[eventIndex];

            // Sprawdź, czy dostępna ilość biletów jest wystarczająca
            if (selectedEvent.iloscBiletow < numberOfTickets) {
                console.log('Brak wystarczającej ilości biletów');
                return;
            }

            // Zaktualizuj stan dostępnych biletów na ekranie
            const updatedEventsData = [...eventsData];
            updatedEventsData[eventIndex].iloscBiletow -= numberOfTickets;
            setEventsData(updatedEventsData);

            // Zaktualizuj stan w bazie danych
            await updateExistingItems({
                id: selectedEvent.id,
                numberOfTickets,
            });

            console.log(`Kupiono ${numberOfTickets} biletów na wydarzenie o indeksie: ${eventIndex}`);
            // Resetuj stan po zakupie
            setSelectedEvent(null);
            setNumberOfTickets(1);
        } catch (error) {
            console.error('Błąd podczas zakupu biletów:', error);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Sklep Biletowy</h2>
            {eventsData.map((event, index) => (
                <div key={index}>
                    <p>Rodzaj: {event.rodzaj}</p>
                    <p>Nazwa wydarzenia: {event.nazwaWydarzenia}</p>
                    <p>Ilość biletów: {event.iloscBiletow === 0 ? 'BRAK' : event.iloscBiletow}</p>
                    <p>Cena biletu: {event.cenaBiletu} zł</p>
                    <p>Data: {event.data}</p>

                    <input
                        type="number"
                        value={numberOfTickets}
                        onChange={handleTicketChange}
                        min="1"
                    />
                    <button onClick={() => handleBuyTickets(index)}>Kup bilet/bilety</button>
                    <hr />
                </div>
            ))}
            <button onClick={handleLoginClick}>Zaloguj</button>
        </div>
    );
};

export default MainView;
