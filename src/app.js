const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pamela',
        lastName: 'Lozano'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Pamela',
        lastName: 'Lozano'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help Message',
        name : 'Pamela',
        lastName: 'Lozano'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
       return res.send({
            error: 'No search'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) =>{

    if(error){ 
        return res.send({ error: 'Error that address does not exists'})  }
     
    else{
    
    forecast(longitude, latitude,(error, {temperature, summary, icon}) => {
           
     if(error){ return res.send({ error:'Error' }) }

      else{
                   //Para que la temperatura se redonde
                 var temp = Math.ceil(temperature)

                 res.send({
                    address : req.query.address,
                    forecast : summary,
                    location,
                    icon,  
                    temperature: temp,
                })  
 
                    }
             })
        }
     })
  
        

})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        res.send({
            error: 'No search'
        })
    } else{
        console.log(req.query)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
    title: '404',
    name: 'Pamela',
    errorMessage: 'Help article not found'
        })
})

app.get('*', (req, res) =>{
    res.render('404',{
    title: '404',
    name: 'Pamela',
    errorMessage: 'Page Not Found'
        })
})

//LOCALHOST 3000
app.listen(port, () => {
    console.log('Server is up on port '+port)
})