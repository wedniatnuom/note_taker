const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = 3002;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
var notes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const findId = require('./helpers/findId');



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});  

app.get('/api/notes', (req,res) => {
    let notes = require('./db/db.json');
    res.status(200).json(notes);
    console.log("retrieving notes")
    console.log(notes);
});

app.get('/api/notes/:id', (req,res) => {
    console.log(req.params.id);
    res.status(200).json(findId(req.params.id));
});

app.post('/api/notes', (req,res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        const response = {
            status: 'success',
            body: newNote,
        };
        fs.readFile('./db/db.json', { encoding: 'utf8'}, (err,data) => {
           newData = JSON.parse(data);
           newData.push(newNote);
           newData = JSON.stringify(newData);           
        fs.writeFile('./db/db.json', newData , (err) => {
            if (err) {
                console.log("error")
            }
            else {
                console.log("appened to db")
            }
        })
    })
        console.log(response);
        console.log(newNote);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in creating new note');
    }
});


app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}!`)
);