const fs = require('fs');
const express = require('express');
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

