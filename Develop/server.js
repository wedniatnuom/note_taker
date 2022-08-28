const express = require('express');
const path = require('path');
const PORT = 3002;
const app = express();
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});  


app.listen(PORT, () =>
  console.log(`Express server listening on port http://localhost:${PORT}!`)
);