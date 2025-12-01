function clearInput(){
    document.getElementById("citySearch").value = "";
}

function clearCards(){
    document.getElementsByClassName("weather-badges")[0].innerHTML = "";
    clearInput();
}

function defaultCards(){
    searchWeather("Toronto");
    searchWeather("Dubai");
    searchWeather("London");
    searchWeather("Las Vegas");
    searchWeather("Cape Town");
    searchWeather("Rome");
}

function searchWeather(city) {
    //const city = document.getElementById("citySearch").value;

    // 1. Geocoding: Get lat/lon
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(r => r.json())
        .then(geo => {
            if (!geo.results) {
                document.getElementById("citySearch").value = "City not found.";
                return;
            }

            const { latitude, longitude, name, country_code } = geo.results[0];

            // 2. Weather API (Daily Forecast)
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`)
                .then(r => r.json())
                .then(data => {
                    const currentTemp = data.current.temperature_2m;
                    const tempUnits = data.current_units.temperature_2m;
                    const weatherCode = data.current.weather_code;
    
                    const weatherDescriptions = {
                        0: "Clear sky",
                        1: "Mainly clear",
                        2: "Partly cloudy",
                        3: "Overcast",
                        45: "Fog",
                        48: "Depositing rime fog",
                        51: "Light drizzle",
                        53: "Moderate drizzle",
                        55: "Dense drizzle",
                        56: "Light freezing drizzle",
                        57: "Dense freezing drizzle",
                        61: "Slight rain",
                        63: "Moderate rain",
                        65: "Heavy rain",
                        66: "Light freezing rain",
                        67: "Heavy freezing rain",
                        71: "Slight snowfall",
                        73: "Moderate snowfall",
                        75: "Heavy snowfall",
                        77: "Snow grains",
                        80: "Rain showers (slight)",
                        81: "Rain showers (moderate)",
                        82: "Rain showers (violent)",
                        85: "Snow showers (slight)",
                        86: "Snow showers (heavy)",
                        95: "Thunderstorm",
                        96: "Thunderstorm with slight hail",
                        99: "Thunderstorm with heavy hail",
                      };   
                      
                      const weatherIcons = {
                        0: "wi wi-day-sunny",
                        1: "wi wi-day-sunny-overcast",
                        2: "wi wi-day-cloudy",
                        3: "wi wi-cloudy",
                        45: "wi wi-fog",
                        48: "wi wi-fog",
                        51: "wi wi-sprinkle",
                        53: "wi wi-sprinkle",
                        55: "wi wi-sprinkle",
                        56: "wi wi-rain-mix",
                        57: "wi wi-rain-mix",
                        61: "wi wi-rain",
                        63: "wi wi-rain",
                        65: "wi wi-rain",
                        66: "wi wi-rain-mix",
                        67: "wi wi-rain-mix",
                        71: "wi wi-snow",
                        73: "wi wi-snow",
                        75: "wi wi-snow",
                        77: "wi wi-snow",
                        80: "wi wi-showers",
                        81: "wi wi-showers",
                        82: "wi wi-showers",
                        85: "wi wi-snow-wind",
                        86: "wi wi-snow-wind",
                        95: "wi wi-thunderstorm",
                        96: "wi wi-thunderstorm",
                        99: "wi wi-thunderstorm",
                      };
                      
                    let html = `<div class="weather-cards">

                        <p class"weather-cards-text">${name}<sup class="country-code">${country_code}</sup></p>
                        <h1><strong>${currentTemp}</strong><sup>${tempUnits}</sup></h1>
                        <li class="${weatherIcons[weatherCode]}"></li>
                        <p class"weather-cards-text">${weatherDescriptions[weatherCode]}</p>

                        </div>
                        `;
                    
                    document.getElementsByClassName("weather-badges")[0].innerHTML += html;
                });
        });
}