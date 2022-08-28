const express = require('express');
const path = require('path');
const PORT = 3002;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const notes = require('./db/notes');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});  

app.get('/api/notes', (req,res) => {
    console.log(notes);
    res.status(200).json(notes);
});


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

app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}!`)
);