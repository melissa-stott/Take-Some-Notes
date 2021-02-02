const fs = require('fs');
const express = require('express');
const PORT = 8080;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('../../../public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));

// app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname + '/..'}));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));