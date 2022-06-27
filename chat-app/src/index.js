const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage ,generateLocationMessage} = require('./utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

const message = 'Welcome habibi'

io.on('connection' , (socket) => {
    console.log('New WebSocket connection')

    socket.on('join' , ({username,room} , callback) => {
        const {error,user} = addUser({id : socket.id , username,room})

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

    socket.emit('message' ,generateMessage('Admin','Welcome !')) // li houwa barka 
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin',user.username +' has joined')) // ness kol f room ken houwa
    io.to(user.room).emit('roomData' , {
        room : user.room,
        users : getUsersInRoom(user.room)
    })

    callback()


    })


    socket.on('sendMessage',(message,callback) => {

        const user = getUser(socket.id)
        const filter = new Filter()
        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message',generateMessage(user.username,message)) // nesskol
        callback()
    })


    socket.on('sendLocation',(data,callback) => {
        const user = getUser(socket.id)
        const message = 'https://google.com/maps?q='+ data.latitude+ ',' +data.longitude
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,message))
        callback()
    })

    socket.on('disconnect' , () => {
        const user =removeUser(socket.id)

        if(user) {
            io.to(user.room).emit('message',generateMessage('Admin',user.username + ' has left'))
            io.to(user.room).emit('roomData' , {
                room:user.room,
                users: getUsersInRoom(user.room)
            })
        }

    })

})

server.listen(port , () => {
    console.log("listen on port "+port)
})