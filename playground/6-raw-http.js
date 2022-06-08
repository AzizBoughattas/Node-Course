const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=2c630cbc85ec6284b8134aba1a517671&query=45,-75&units=m'

const request = http.request(url,(response) => {

    let data = ''
    response.on('data' , (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end' , () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error' , (error) => {
    console.log('an error' , error)
})

request.end()