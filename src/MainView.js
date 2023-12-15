import React, { useState } from 'react';

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEvent: null,
            numberOfTickets: 1,
        };
    }

    handleEventChange = (event) => {
        this.setState({ selectedEvent: event.target.value });
    };

    handleTicketChange = (event) => {
        this.setState({ numberOfTickets: parseInt(event.target.value, 10) });
    };

    handleBuyTickets = () => {
        const { selectedEvent, numberOfTickets } = this.state;

        console.log(`Kupiono ${numberOfTickets} biletów na wydarzenie: ${selectedEvent}`);

        this.setState({ selectedEvent: null, numberOfTickets: 1 });
    };

    render() {
        const { selectedEvent, numberOfTickets } = this.state;

        return (
            <div>
                <h2>Sklep Biletowy</h2>
                <label>Wybierz wydarzenie:</label>
                <select onChange={this.handleEventChange} value={selectedEvent}>
                    <option value="koncert">Koncert</option>
                    <option value="teatr">Spektakl Teatralny</option>
                    <option value="sport">Wydarzenie Sportowe</option>
                </select>

                <label>Liczba biletów:</label>
                <input
                    type="number"
                    min="1"
                    value={numberOfTickets}
                    onChange={this.handleTicketChange}
                />

                <button onClick={this.handleBuyTickets}>Kup Bilety</button>
            </div>
        );
    }
}

export default MainView;
