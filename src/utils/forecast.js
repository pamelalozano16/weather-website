const request = require('request')


const forecast = (lon, lat, callback) =>{
const myurl = 'https://api.darksky.net/forecast/44d789e7489a65a5c53f797e73ada476/'+lat+','+lon+'?units=si&lang=en'

  request({ url:myurl, json: true }, (error, {body}) => {

    if(error){
      callback('Unable to connect to internet', undefined)
    }
    else if(body.error){
      callback('Unable to find that location', undefined)
    }
    
    else{
      var precip = Math.ceil(body.currently.precipProbability*100)
      callback(undefined, {
        
        summary : body.daily.data[0].summary+'<br><br> Precipitation: '+(precip)+'%',
        temperature : body.currently.temperature,
        zone: body.timezone,
        icon: body.currently.icon
      })


    }
    })
}

module.exports = forecast