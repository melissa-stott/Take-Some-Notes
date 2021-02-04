const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path');
let db = '';
const { v4: uuidv4 } = require('uuid');
const pathToDB = path.join(__dirname, './db/db.json');
const pathToPublic = path.join(__dirname, './public');

fs.readFile(pathToDB,'utf8', (error, data) =>
{
    if (error) {
        throw error;
    }

    db = JSON.parse(data);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(pathToPublic));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

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
    fs.writeFile(pathToDB, JSON.stringify(db), (err) =>
    err ? console.error(err) : console.log('Success!'));
    return res.status(200).send();
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let deleteID = -1;
    for (let index = 0; index < db.length; index++) {
        const element = db[index];
        if (element.id === id) {
            deleteID = index;
            break;
        }
    }
    db.splice(deleteID, 1);
    fs.writeFile(pathToDB, JSON.stringify(db), (err) =>
    err ? console.error(err) : console.log('Success!'));
    return res.status(200).send();
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
