// Open Weather API credentials
const appid = 'fd2419db9b1ba37a5761e0dae704b031';


// Helper get current time function
const get_time = () => {
    let dateObj = new Date();
    hours = dateObj.getHours();
    minutes = dateObj.getMinutes();
    let am_pm;
    if (hours < 12) {
        am_pm = "a.m.";
    } else {
        hours -= 12;
        am_pm = "p.m.";
    }
    formattedTime = hours.toString()
        + ":" + minutes.toString()
        + " " + am_pm;

    return formattedTime;
}


// https://api.openweathermap.org/data/2.5/weather?zip={zipcode},us&appid={API key}&units=imperial

const getWeather = async (query) => {
    if (Number(query)) {
        q = `zip=${query}`
    } else {
        q = `q=${query}`
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${q},us&appid=${appid}&units=imperial`);
    const data = await response.json();

    const weather_data = {
        city_name: data.name,
        dt: get_time(),
        temp: Math.round(data.main.temp),
        forecast: data.weather[0].description,
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed),
        icon: data.weather[0].icon
    };
    return weather_data
};

const form = document.querySelector('form');
const current_card = document.querySelector('.current_card');

form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const query = form[0].value.toLowerCase();
    const weather_data = await getWeather(query);
    current_card.innerHTML = `
        <p class="city">${weather_data.city_name} as of ${weather_data.dt}</p>
        <div class="temp-img-div">
            <p class="current_temp">${weather_data.temp}&#176;</p>
            <img class="weather-icon" src="https://openweathermap.org/img/w/${weather_data.icon}.png" alt="${weather_data.forecast}">
        </div>
        <div class="forecast">
            <p class="titlecase">${weather_data.forecast}</p>
            <p>Feels like: ${weather_data.feels_like}&#176;</p>
        </div>
        <p>Humidity: ${weather_data.humidity}%</p>
        <p>Wind speed: ${weather_data.wind_speed}mph</p>
    `
});