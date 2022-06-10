// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient , ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



MongoClient.connect(connectionUrl,{ useNewUrlParser: true }, (error,client)=> {
    if(error) {
      return console.log('Unable to connect to database')
    }

 const db = client.db(databaseName)

//  db.collection('users').deleteMany({
//      age:26
//  }).then((result)=> {
//      console.log(result)
//  }).catch((error)=> {
//      console.log(error)
//  })

db.collection('tasks').deleteOne({
    description:'marching'
}).then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})

})
