const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

yargs.command({
    command : 'add',
    describe : 'add a new note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type : 'string'
        },
        body : {
            describe : 'Note the body',
            demandOption: true,
            type:'string'
        }
    },
    handler : function(argv) {
       notes.addNote(argv.title,argv.body)
    }
})


yargs.command({
    command:'remove',
    describe:'remove a note',
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})
yargs.command({
    command:'list',
    describe:'list your notes',
    handler() {
       notes.listNotes()
    }
})
yargs.command({
    command:'read',
    describe:'read a note',
    builder: {
        title : {
            describe:'here is your title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
       notes.readNote(argv.title)
    }
})
yargs.command({
    command:'another',
    describe:'hellooooo',
    builder : {
        description : {
            describe:'hellooooo',
            demandOption:true,
            type:'string'
        }
    },
    handler() {
        console.log(yargs.argv)
    }
})

yargs.parse()
