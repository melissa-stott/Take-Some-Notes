const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 8080;
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

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let newId = uuidv4();
    let newText = {
        id: newId,
        title: newNote.title,
        text: newNote.text
    };
    db.push(newText);
    fs.writeFile('../../../db/db.json', JSON.stringify(db), (err) =>
    err ? console.error(err) : console.log('Success!'));
    return res.status(200).send();
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));