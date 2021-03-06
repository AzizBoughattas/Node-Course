const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') //kn nhebou nbadlou ism folder maadech views to templates
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup hanlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //nseti express js bch iwali yaarefha
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Aziz'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title :'About me',
        name : 'Aziz boughattas'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        name:'Aziz',
        title:'Help',
        message:'Here you can find the help'
    })
})


app.get('/weather' , (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide an address'
        })
    }

    
    geocode(req.query.address, (error,{latitude,longitude,location} ={}) => {
            
        if(error) {
            return res.send({
                error : 'Please provide an correct address'
            })
        }
        forecast(longitude,latitude , (error,forecastData) => {
            if(error) {
                return res.send(error)
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
    


})

app.get('/products', (req,res) => {

    if(!req.query.search) {
       return res.send({
            error : 'You must provide a search team'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404-page',{
        title:'404',
        name : 'Aziz',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404-page',{
        title:'404',
        name : 'Aziz',
        errorMessage:'Page not found'
        
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})