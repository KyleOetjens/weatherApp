let apiKey = `75baa2e1ca20f28d0a136b9d0eb3b22f`
let weatherurl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=` + apiKey
let geoCode = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=` + apiKey
var apiUrlWeather1 = `https://api.openweathermap.org/data/2.5/weather?appid=$75baa2e1ca20f28d0a136b9d0eb3b22f
&q=$atlanta&units=imperial`;
let cityButton = $(`.cityBtn`);
let userFormEl = document.querySelector('#city-input');
let cityInputEl = document.querySelector(`.cityText`)
let currentCityText = document.querySelector('.cityCurrentNameDate')
let currentTempText = document.querySelector('.currentTemp')
let currentWindText = document.querySelector('.currentWind')
let currentHumidText = document.querySelector('.currentHumid')
let currentWeatherIcon = document.querySelector('.currentWeatherIcon')
let buttonContainer = $(`.btn-group-vertical`);
let currentWeatherImg = document.querySelector(`#currentWeatherIcon`)
/*let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=`+apiKey+`
&q=$`+citySelect+`&units=imperial`;
https://api.openweathermap.org/data/2.5/weather?appid=75baa2e1ca20f28d0a136b9d0eb3b22f&q=atlanta&units=imperial
https://api.openweathermap.org/data/2.5/weather?appid=$75baa2e1ca20f28d0a136b9d0eb3b22f&q=$atlanta&units=imperial
https://api.openweathermap.org/data/2.5/weather?appid=75baa2e1ca20f28d0a136b9d0eb3b22f&q=atlanta&units=imperial
*/

//get weather data based on button clicks, do not need local storage,
// consider loading data on page load so that card is populated( would need local storage)
function test() {
    const $el = $(this)
    console.log($el);
    let citySelect = $el.text()
    console.log(citySelect);

    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=` + apiKey + `&q=` + citySelect + `&units=imperial`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const lat = data.coord.lat
                    const lon = data.coord.lon
                    const cityName = data.name
                    const cityTempHigh = data.main.temp_max
                    const cityTempLow = data.main.temp_min
                    const wind = data.wind.speed
                    const humid = data.main.humidity
                    const weatherIcon = data.weather[0].icon
                    console.log(data);
                    console.log(lat, lon, cityName, cityTempHigh, cityTempLow, wind, humid);
                    currentCityText.textContent = cityName
                    currentTempText.textContent = `Temp: High: ` + cityTempHigh + `°F` + `,   Low: ` + cityTempLow + `°F`
                    currentWindText.textContent = `Wind: ` + wind + ` MPH`
                    currentHumidText.textContent = `Humidity: ` + humid + `%`
                    currentWeatherImg.src = `https://openweathermap.org/img/w/` + weatherIcon + `.png`;
                    console.log(currentWeatherImg);
                    //var iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                    getFiveDayForcast(lat, lon)
                });
            }
        })
}
cityButton.on('click', test)
//think about generating 5 day forcast dynamically
//get weather data from typed entry, need to use local storage
//and generate a new button

const newCityWeather = function (event) {
    event.preventDefault();
    let cityType = cityInputEl.value.trim();
    /*  const $el = $(this)
      console.log($el);
      let citySelect = $el.text()
      console.log(citySelect);*/
    if (cityType !== "") {
        console.log("this part works");
        textCurrentWeather(cityType)
    } else {
        window.alert("please enter a valid city");
    }
}
let textCurrentWeather = function (cityType) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=` + apiKey + `&q=` + cityType + `&units=imperial`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const lat = data.coord.lat
                    const lon = data.coord.lon
                    const cityName = data.name
                    const cityTempHigh = data.main.temp_max
                    const cityTempLow = data.main.temp_min
                    const wind = data.wind.speed
                    const humid = data.main.humidity
                    const weatherIcon = data.weather[0].icon
                    console.log(data);
                    console.log(lat, lon, cityName, cityTempHigh, cityTempLow, wind, humid);
                    currentCityText.textContent = cityName
                    currentTempText.textContent = `Temp: High: ` + cityTempHigh + `°F` + `,   Low: ` + cityTempLow + `°F`
                    currentWindText.textContent = `Wind: ` + wind + ` MPH`
                    currentHumidText.textContent = `Humidity: ` + humid + `%`
                    let newCityBtn = document.createElement('button');
                    newCityBtn.addEventListener("click", test)
                    document.querySelector('.btn-group-vertical').appendChild(newCityBtn);
                    newCityBtn.setAttribute("type", 'button');
                    newCityBtn.setAttribute(`class`, `btn cityBtn btn-secondary`);
                    newCityBtn.textContent = cityName;
                    currentWeatherImg.src = `https://openweathermap.org/img/w/` + weatherIcon + `.png`;
                    // consider let li = document.createElement('li')
                    //document.querySelector('ul').appendChild(li)
                    getFiveDayForcast(lat, lon)
                });
            }
        })
}
userFormEl.addEventListener('submit', newCityWeather);
const getFiveDayForcast = function (lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=` + lat + `&lon=` + lon + `&units=imperial&appid=` + apiKey)
        .then(function (response){
            console.log("made it here");
            if (response.ok) {
                response.json().then(function (data){
                    console.log(data);
                    let date = data.list[2];
                    console.log(date);
                    for (let index = 2; index < data.length; index+8) {
                        const element = data.list[index];
                        console.log(element[index]);
                        
                    }
                })
            }
        })
}