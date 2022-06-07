const fs = require('fs')
// const book = {
//     title : 'Ego is the Enemy',
//     author : 'Ryan Holiday'
// }

// const bookJSON =JSON.stringify(book)
// fs.writeFileSync('1-json.json' , bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJson = dataBuffer.toString()
// const data = JSON.parse(dataJson)
// console.log(data.title)


const BufferData = fs.readFileSync('1-json.json')
const JsonData = BufferData.toString()
const data = JSON.parse(JsonData)
data.name = "Aziz"
data.planet = "kawekeb"
data.age = 54

console.log(data)

const Json = JSON.stringify(data)
fs.writeFileSync('1-json.json',Json)