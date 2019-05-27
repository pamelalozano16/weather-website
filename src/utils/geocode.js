const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGFtZWxhbG96YW5vOTkiLCJhIjoiY2p2b2FidGtuMDh0ZDRhdDVoYWYyeWRydSJ9.9AIb314OpW2RvJRbGbtLfw'
    
      request({url: geocodeURL, json : true}, (error, {body}) => {
        if(error){
        callback('Unable to connect to location services!', undefined)
      }
    else if(body.message==='Not Found'){
        callback('Location not found', undefined)
     } 
        else if(body.features.length===0){
      callback('Unable to find location, try another one.', undefined)
      }
      else{
        callback(undefined, {
          longitude : body.features[0].center[0],
          latitude : body.features[0].center[1],
          location : body.features[0].place_name
        })
      }
    
    
    })
    }

  module.exports = geocode  