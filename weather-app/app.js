
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

process.argv[2] ? geocode(process.argv[2], (error, {longitude,latitude,location}= {}) => {

    if(error) {
        return console.log('Error ',error)
    }
   forecast(longitude,latitude,  (error, forecastData) => {

    if(error) {
        return console.log('Error ',error)
    }

    console.log(location)
    console.log(forecastData)
  })
}) : console.log('please provide an address')
