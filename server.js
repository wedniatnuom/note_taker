const express = require('express');
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 3001;
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
    fs.readFile("./db/db.json", 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          return
        }
        res.json(JSON.parse(data))
      })
    })

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

        fs.readFile('./db/db.json', { encoding: 'utf8'}, (err,data) => {
           newData = JSON.parse(data);
           newData.push(newNote);
           newData = JSON.stringify(newData);           
        fs.writeFile('./db/db.json', newData , (err) => {
            if (err) {
                console.log("error")
            }
            else {
                const response = {
                    status: 'success',
                    body: newData,
                };
                res.status(201).json(response);
                
            }
        })
    })

        
    } else {
        res.status(500).json('Error in creating new note');
    }
});


app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}!`)
);