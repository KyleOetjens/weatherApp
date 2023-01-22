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
let fiveDayBlock = $(`#fiveDayContainer`)
let ctyBtn= []

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
                    getFiveDayForcast(lat, lon)
                });
            }
        })
}
cityButton.on('click', test)

const newCityWeather = function (event) {
    event.preventDefault();
    let cityType = cityInputEl.value.trim();
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
                    localStorage.setItem("city",JSON.stringify(cityType))
                    getFiveDayForcast(lat, lon)
                });
            }
        })
}
userFormEl.addEventListener('submit', newCityWeather);
const getFiveDayForcast = function (lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=` + lat + `&lon=` + lon + `&units=imperial&appid=` + apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    let weatherList = data.list
                    fiveDayBlock.empty()
                    for (let index = 5; index < weatherList.length; index += 8) {
                        const element = weatherList[index];
                        const fiveDayWeather = weatherList[index].dt_txt;
                        const fiveDayIcon = weatherList[index].weather[0].icon;
                        const fiveDayHighTemp = weatherList[index].main.temp_max;
                        const fiveDayWind = weatherList[index].wind.speed;
                        const fiveDayHumid = weatherList[index].main.humidity;
                        let cardDiv = document.createElement('div')
                        let cardBodyDiv = document.createElement('div')
                        let cardDate = document.createElement('h5')
                        let cardImg = document.createElement('img')
                        let cardTempP = document.createElement('p')
                        let cardWindP = document.createElement('p')
                        let cardHumidP = document.createElement('p')
                        cardBodyDiv.setAttribute("class","fiveDayCards")
                        fiveDayBlock.append(cardDiv)
                        cardDiv.appendChild(cardBodyDiv)
                        cardBodyDiv.appendChild(cardDate)
                        cardBodyDiv.appendChild(cardImg)
                        cardBodyDiv.appendChild(cardTempP)
                        cardBodyDiv.appendChild(cardWindP)
                        cardBodyDiv.appendChild(cardHumidP)

                        cardDate.textContent = fiveDayWeather
                        cardImg.src = `https://openweathermap.org/img/w/` + fiveDayIcon + `.png`;
                        cardTempP.textContent = (`Temp: `+fiveDayHighTemp + ' °F')
                        cardWindP.textContent = (`Wind: `+fiveDayWind + ' MPH')
                        cardHumidP.textContent = (`Humidity: `+fiveDayHumid + '%')
                        cardBodyDiv.setAttribute("class","fiveCard")

                    }
                })
            }
        })
}


