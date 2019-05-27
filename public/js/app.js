const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

 const lugar = search.value

 fetch('/weather?address='+lugar).then ((response) =>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("location").innerHTML = data.error;
            document.getElementById("forecast").innerHTML ="";
            return console.log(data.error)
        }
        console.log(data.location)
        console.log(data.forecast)
        document.getElementById("location").innerHTML = data.location;
        document.getElementById("forecast").innerHTML = data.forecast+'<br><br>'+'Temperature: '+data.temperature+'C°';
        document.getElementById("icono").src ='/img/'+data.icon+'.png';
   
    })
    })

    search.value="";
})

//VARIABLE DEL LUGAR

// const lugar='Monterrey'


