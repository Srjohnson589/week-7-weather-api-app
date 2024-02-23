// Open Weather API credentials
const appid = 'fd2419db9b1ba37a5761e0dae704b031';

// https://api.openweathermap.org/data/2.5/weather?zip={zipcode},us&appid={API key}&units=imperial

const getWeather = async (zip) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${appid}&units=imperial`);
    const data = await response.json();
    const weather_data = {
        city_name: data.name,
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        forecast: data.weather[0].main,
        humidity: data.main.humidity,
        feels_like: Math.round(data.main.feels_like),
        wind_speed: Math.round(data.wind.speed)
    };
    return weather_data
}

const see_data = getWeather('46617')
console.log(see_data);