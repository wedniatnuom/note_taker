const express = require('express');
const path = require('path');
const PORT = 3002;
const app = express();
app.use(express.static('public'));

app.post('/notes', (req,res) => {
    const { title, text } = req.body;
    console.info(`${req.method} request received to add a new note`);

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in creating new note');
    }
});