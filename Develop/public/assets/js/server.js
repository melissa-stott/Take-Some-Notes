const fs = require('fs');
const express = require('express');
const PORT = 8080;
const app = express();
const path = require('path');
let db = '';
const { v4: uuidv4 } = require('uuid');
fs.readFile('../../../db/db.json','utf8', (error, data) =>
{
    if (error) {
        throw error;
    }

    db = JSON.parse(data);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('../../../public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));

app.get('/api/notes', (req, res) => {
    res.send(JSON.stringify(db))
});


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));