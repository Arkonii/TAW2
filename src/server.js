const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs/promises');
//const mongoose = require('mongoose');

const app = express();
const port = 5000;
const dataFilePath = 'data.json';

app.use(bodyParser.json());
app.use(cors());



async function writeEventData(newData) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');
    } catch (error) {
        console.error('Błąd podczas zapisywania danych:', error);
        throw error;
    }
}

// ...

app.post('/api/updateExistingItems', async (req, res) => {
    const updatedEventData = req.body;
    console.log('Dane przekazane do aktualizacji:', updatedEventData);

    try {
        let currentData = await readFile();

        const eventIndex = currentData.findIndex(event => event.id === updatedEventData.id);

        if (eventIndex !== -1) {
            // Sprawdź, czy dostępna ilość biletów jest wystarczająca
            if (currentData[eventIndex].iloscBiletow < updatedEventData.numberOfTickets) {
                res.status(400).json({ error: 'Brak wystarczającej ilości biletów' });
                return;
            }

            // Zaktualizuj stan dostępnych biletów w bazie danych
            currentData[eventIndex].iloscBiletow -= updatedEventData.numberOfTickets;
            await writeEventData(currentData);

            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Nie znaleziono wydarzenia do zaktualizowania' });
        }
    } catch (error) {
        console.error('Błąd podczas aktualizacji danych:', error);
        res.status(500).json({ error: 'Błąd podczas aktualizacji danych' });
    }
});


app.get('/api/getItems', async (req, res) => {
    try {
        const data = await readFile();
        res.json(data);
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        res.status(500).json({ error: 'Błąd podczas pobierania danych' });
    }
});


app.post('/api/updateItems', async (req, res) => {
    const newData = req.body;
    console.log('Dane przekazane do aktualizacji:', newData);

    try {
        await writeFile(newData);
        res.json({ success: true });
    } catch (error) {
        console.error('Błąd podczas aktualizacji danych:', error);
        res.status(500).json({ error: 'Błąd podczas aktualizacji danych' });
    }
});

async function readFile() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Jeśli plik nie istnieje, zwróć pustą tablicę
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function writeFile(newData) {
    try {
        let currentData = await readFile();

        if (!Array.isArray(currentData) || currentData.length === 0) {
            // Jeśli obecne dane nie są tablicą lub są puste, zainicjuj nową pustą tablicę
            currentData = [];
        }

        const updatedData = [...currentData, newData];
        await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2), 'utf-8');
    } catch (error) {
        console.error('Błąd podczas zapisywania danych:', error);
        throw error;
    }
}




const users = [
    { username: 'admin', password: 'haslo' },
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken();
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Błędne dane logowania' });
    }
});
function generateToken() {
    return Math.random().toString(36).substring(7);
}


app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});

