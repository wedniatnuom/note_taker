const notes = require("../db/db.json");


module.exports = (id) => {
    let data = {}

    for(let i=0; i < notes.length; i++){
        if(notes[i].id === id) data = notes[i];  
    }

    return data;
};