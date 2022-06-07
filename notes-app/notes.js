const fs = require('fs')
const chalk = require('chalk')


 const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger
    
    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('note title taken'))
    }

    
}


const readNote = (title) => {
    const notes= loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (duplicateNote) {
        console.log(chalk.cyan.underline(duplicateNote.title))
        console.log(chalk.cyan.inverse(duplicateNote.body)) 
    } else {
        console.log(chalk.red.bold('No note found'))
    }
}



 const removeNote =(title) =>{
    const notes = loadNotes()

    const notesToKepp = notes.filter((note)=> {
       return note.title !==title
    })
    if(notes.length!=notesToKepp.length) {
        saveNotes(notesToKepp)
        console.log(chalk.green.inverse('Note Removed'))
    } else {
        console.log(chalk.bgRed('No Note Found'))
    }
}

const listNotes =() => {
    const notes = loadNotes()

    console.log(chalk.green.inverse('Your Notes :'))

    notes.forEach((e) => {
        console.log(e)
    });
 }

 const saveNotes=(notes) => {
  const dataJson=  JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJSon)
}
const loadNotes = () =>{

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }


}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote:readNote
}