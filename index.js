const apiKey = '71c77359887e4025d2407bc097232d68'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const cardBg = document.querySelector('.card')

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`)

    if(response.status == 404){
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    } else {
    var data = await response.json()

    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = data.main.temp.toFixed(1) + 'ºC'
    document.querySelector('.feels_like').innerHTML = data.main.feels_like.toFixed(1) + 'ºC'
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed.toFixed(1) + ' km/h'
   

    //calcular hora com base na timezone
    const date = new Date()
    const gmtHour = date.getUTCHours()
    const currentMinutes = date.getUTCMinutes().toString().padStart(2, '0')

    const timeZone = data.timezone


    async function realTime(gmtHour, timeZone) {

        let hours


        if (gmtHour == 0) {
            hours = 24 + (timeZone / 3600)
        } else {
            hours = gmtHour + (timeZone / 3600)
        }
        
        if (hours < 0) {
            hours = 24 + hours
        } else if (hours > 24) {
            hours = hours - 24
        }
    
        // Formata a hora e os minutos para sempre terem dois dígitos
        let realHours = hours.toString().padStart(2, '0')

        return {
            hours : realHours
        }
    }

    const currentHour = await realTime(gmtHour, timeZone)

    document.querySelector('.time').innerHTML = `${currentHour.hours}:${currentMinutes}`
    
    cardBg.style.backgroundImage = 'linear-gradient(to top, #1a3636, #3b584d, #667b62, #9b9c79, #d6bd98)'

    if (currentHour.hours < 5 || currentHour.hours > 19) {
        weatherIcon.src = 'images/moon.png'
        cardBg.style.backgroundImage = 'linear-gradient(to top, #1a3636, #182b30, #172025, #141619, #090909)'
    }
    else if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = 'images/clouds.png'
    } 
    else if (data.weather[0].main == 'Clear'){
        weatherIcon.src = 'images/clear.png'
    }
    else if (data.weather[0].main == 'Rain'){
        weatherIcon.src = 'images/rain.png'
    }
    else if (data.weather[0].main == 'Drizzle'){
        weatherIcon.src = 'images/drizzle.png'
    }
    else if (data.weather[0].main == 'Mist'){
        weatherIcon.src = 'images/mist.png'
    }

    document.querySelector('.error').style.display = 'none'

}
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
} )

checkWeather('Sao Paulo')