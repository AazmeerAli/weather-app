let period;
function getAMPM(hour) {
    if (hour >= 6 && hour < 21) {
        period = 'PM';

    } else {
        period = 'AM';

    }

}


function getWeatherIcon(ImgPara, ValueFromAPI) {
    let ComingData = ValueFromAPI.weather[0].main

    if (ComingData == 'Clear' && period == 'PM') {
        ImgPara.setAttribute("src", "svgs/sun.svg");
    }
    else if (ComingData == 'Clear' && period == 'AM') {
        ImgPara.setAttribute("src", "svgs/moon.svg");
        ImgPara.setAttribute("style", "width: 45px");
    }
    else if (ComingData == "Clouds") {
        ImgPara.setAttribute("src", "svgs/cloudy.svg");
    }
    else if (ComingData == "Rain") {
        ImgPara.setAttribute("src", "svgs/rain.svg");
    }
    else if (ComingData == "Snow") {
        ImgPara.setAttribute("src", "svgs/snow.svg");
    }
    else if (ComingData == "Haze") {
        ImgPara.setAttribute("src", "svgs/haze.svg");
    }
    else if (ComingData == "Mist") {
        ImgPara.setAttribute("src", "svgs/mist.svg");
    }
    else if (ComingData == "Fog" || ComingData == "Foggy") {
        ImgPara.setAttribute("src", "svgs/fog.svg");
    }
    else if (ComingData == "Smoke") {
        ImgPara.setAttribute("src", "svgs/smoke.svg");
    }
    else {
        ImgPara.setAttribute("src", "svgs/overcast.svg");
    }
}

let nextDayImg2 = document.querySelector(".little-card-2-img")
let nextDayImg3 = document.querySelector(".little-card-3-img")
let nextDayImg4 = document.querySelector(".little-card-4-img")


function getForecast(ValueOfAPI, ImgPara, DayNumber, DataComing) {

    let SimilarConditionFromData = ValueOfAPI.forecast.forecastday[DayNumber].day.condition.text

    function targetWords(sentence, targetConditionWords, ComingData) {
        ComingData = targetConditionWords[1]
        return targetConditionWords.some(word => sentence.includes(word))
    }


    let TargetWordsRain = ['rain', 'Rain']
    let TargetWordsSnow = ['snow', 'Snow']
    let TargetWordsClouds = ['clouds', 'Clouds', 'cloudy', 'Cloudy', 'cloud', 'Cloud']
    let TargetWordsFog = ['fog', 'Fog', 'foggy', 'Foggy']

    if (targetWords(SimilarConditionFromData, TargetWordsRain, DataComing) == true) {
        ImgPara.setAttribute("src", "svgs/rain.svg");
    }
    else if (targetWords(SimilarConditionFromData, TargetWordsSnow, DataComing) == true) {
        ImgPara.setAttribute("src", "svgs/snow.svg");
    }
    else if (targetWords(SimilarConditionFromData, TargetWordsClouds, DataComing) == true) {
        ImgPara.setAttribute("src", "svgs/cloudy.svg");
    }
    else if (targetWords(SimilarConditionFromData, TargetWordsFog, DataComing) == true) {
        ImgPara.setAttribute("src", "svgs/fog.svg");
    }
    else if (SimilarConditionFromData == 'Clear' && period == 'PM') {
        ImgPara.setAttribute("src", "svgs/sun.svg");
    }
    else if (SimilarConditionFromData == 'Clear' && period == 'AM') {
        ImgPara.setAttribute("src", "svgs/moon.svg");
    }
    else if (SimilarConditionFromData == "Sunny") {
        ImgPara.setAttribute("src", "svgs/sun.svg");
    }
    else if (SimilarConditionFromData == "Overcast") {
        ImgPara.setAttribute("src", "svgs/clouds.svg");
    }
    else if (SimilarConditionFromData == "Haze") {
        ImgPara.setAttribute("src", "svgs/haze.svg");
    }
    else if (SimilarConditionFromData == "Mist") {
        ImgPara.setAttribute("src", "svgs/mist.svg");
    }
    else if (SimilarConditionFromData == "Smoke") {
        ImgPara.setAttribute("src", "svgs/smoke.svg");
    }
    else {
        ImgPara.setAttribute("src", "svgs/overcast.svg");
    }
}

function widthSet(ImgPara, ComingData) {


    if (ComingData == 'Clear' && period == 'AM') {
        ImgPara.setAttribute("style", "width: 25px");
    }

    else if (ComingData == 'Mist' || ComingData == 'Clear' && period == 'AM') {
        ImgPara.setAttribute("style", "width: 25px");
    }

    else if (ComingData == 'Rain') {
        ImgPara.setAttribute("style", "width: 33px");
    }

    else if (ComingData == 'Cloud') {
        ImgPara.setAttribute("style", "width: 35px");
    }

    else {
        ImgPara.setAttribute("style", "width: 30px");
    }
}


function getForecastTemp(value, Tag, DayNumber) {
    Tag.innerHTML = `${(value.forecast.forecastday[DayNumber].day.avgtemp_c).toFixed(1) / 1} °C`
}


function defaultValues() {
    var day = document.querySelector(".day")
    let date = document.querySelector(".date")
    var loca = document.querySelector(".location")
    var icon = document.querySelector(".big-icon")
    var temp = document.querySelector(".temperature")
    var condition = document.querySelector(".condition")
    var preci = document.querySelector(".preci-val")
    var humidity = document.querySelector(".humidity-val")
    var wind = document.querySelector(".wind-val")


    let apikey = "bfe6b227068d490c85ba0ccd34cf543a"
    let locationAPI = fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${apikey}`)      

    locationAPI.then(response => {
        return response.json()
    }).then(location => {

        var defaultCity = location.city.name
        var defaultCountryCode = location.country.iso_code

        let apikey2 = "5a080ba85d624f87a5c171743240904"
        let timezoneAPI = fetch(`http://api.weatherapi.com/v1/timezone.json?key=${apikey2}&q=${defaultCity}`)

        timezoneAPI.then(response => {
            return response.json()
        }).then(timezone => {

            var timeZone = timezone.location.tz_id

            let timeAPI = fetch(`http://worldtimeapi.org/api/timezone/${timeZone}`)

            timeAPI.then(response => {
                return response.json()
            }).then(value => {

                let dayIndex = value.day_of_week
                let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let newDay = daysOfWeek[dayIndex]

                let dateTime = value.datetime

                let hour = dateTime.slice(11, 13)

                getAMPM(hour)

                let Today = dateTime.slice(8, 10)
                let monthFromAPI = dateTime.slice(5, 7)
                let monthIndex = (monthFromAPI / 1) - 1
                let monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let Month = monthNames[monthIndex]
                let year = dateTime.slice(0, 4)

                day.innerHTML = newDay;
                date.innerHTML = `${Today} ${Month}, ${year}`;

                var dataString = defaultCity;
                var cityRegex = /^([^(]+)/;
                var matches = dataString.match(cityRegex);

                if (matches) {
                    var cityName = matches[1].trim();
                }

                let API_key = "2da794fa96984c5cc13762e8912a1e46"
                let weatherAPI = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`)

                weatherAPI.then((response) => {
                    return response.json()
                }).then((value) => {

                    loca.innerHTML = `<img src="svgs/Location.svg" alt=""> ${cityName}, ${defaultCountryCode}`
                    temp.innerHTML = `${((value.main.temp) - 273.15).toFixed(1) / 1} °C`
                    condition.innerHTML = value.weather[0].main
                    humidity.innerHTML = `${value.main.humidity}%`
                    wind.innerHTML = `${((value.wind.speed) * 3.6).toFixed(1)} km/h`

                    function widthSetOfIcon(ImgPara, ValueFromAPI) {
                        if (ValueFromAPI.weather[0].main == "Mist") {
                            ImgPara.setAttribute("style", "width:40px");
                        }
                    }

                    getWeatherIcon(icon, value)
                    widthSetOfIcon(icon, value)


                    let nextDay1 = document.querySelector(".next-day-1")
                    let nextDay2 = document.querySelector(".next-day-2")
                    let nextDay3 = document.querySelector(".next-day-3")
                    let nextDay4 = document.querySelector(".next-day-4")

                    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                    let shortNewDay1 = weekdays[dayIndex];
                    nextDay1.innerHTML = shortNewDay1;

                    // dayIndex = 6
                    var dayIndex2 = dayIndex + 1;
                    var dayIndex3 = dayIndex + 2;
                    var dayIndex4 = dayIndex + 3;

                    if (dayIndex2 > 6) {
                        dayIndex2 = dayIndex2 - 7;
                    }
                    else if (dayIndex3 > 6) {
                        dayIndex3 = dayIndex3 - 7;
                    }
                    else if (dayIndex4 > 6) {
                        dayIndex4 = dayIndex4 - 7;
                    }

                    let shortNewDay2 = weekdays[dayIndex2];
                    let shortNewDay3 = weekdays[dayIndex3];
                    let shortNewDay4 = weekdays[dayIndex4];

                    nextDay2.innerHTML = shortNewDay2;
                    nextDay3.innerHTML = shortNewDay3;
                    nextDay4.innerHTML = shortNewDay4;

                    let nextDayImg1 = document.querySelector(".little-card-1-img")

                    let ComingData = value.weather[0].main

                    getWeatherIcon(nextDayImg1, value)
                    widthSet(nextDayImg1, ComingData)

                    let nextDayTemp1 = document.querySelector(".next-day-temp-1")
                    nextDayTemp1.innerHTML = `${((value.main.temp) - 273.15).toFixed(1) / 1} °C`

                    let apikey = "5a080ba85d624f87a5c171743240904"
                    let DaysForecastAPI = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${defaultCity}&days=4&aqi=no&alerts=no`)

                    DaysForecastAPI.then((response) => {
                        return response.json()
                    }).then((value) => {

                        getForecast(value, nextDayImg2, 1)
                        getForecast(value, nextDayImg3, 2)
                        getForecast(value, nextDayImg4, 3)

                        let ComingData2 = value.forecast.forecastday[1].day.condition.text
                        let ComingData3 = value.forecast.forecastday[2].day.condition.text
                        let ComingData4 = value.forecast.forecastday[3].day.condition.text

                        widthSet(nextDayImg2, ComingData2)
                        widthSet(nextDayImg3, ComingData3)
                        widthSet(nextDayImg4, ComingData4)


                        let nextDayTemp2 = document.querySelector(".next-day-temp-2")
                        let nextDayTemp3 = document.querySelector(".next-day-temp-3")
                        let nextDayTemp4 = document.querySelector(".next-day-temp-4")

                        getForecastTemp(value, nextDayTemp2, 1)
                        getForecastTemp(value, nextDayTemp3, 2)
                        getForecastTemp(value, nextDayTemp4, 3)
                    })

                })
            })

        })
    })
}

defaultValues()




var input = document.querySelector("#myInput")

input.addEventListener("keypress", (event) => {

    function InputValues() {
        var day = document.querySelector(".day")
        let date = document.querySelector(".date")
        var loca = document.querySelector(".location")
        var icon = document.querySelector(".big-icon")
        var temp = document.querySelector(".temperature")
        var condition = document.querySelector(".condition")
        var preci = document.querySelector(".preci-val")
        var humidity = document.querySelector(".humidity-val")
        var wind = document.querySelector(".wind-val")

        var cityName = input.value;

        let apikey2 = "5a080ba85d624f87a5c171743240904"
        let timezoneAPI = fetch(`http://api.weatherapi.com/v1/timezone.json?key=${apikey2}&q=${cityName}`)

        timezoneAPI.then(response => {
            return response.json()
        }).then(timezone => {

            var timeZone = timezone.location.tz_id

            function countryCodeFunc(valueOfAPI) {
                loca.innerHTML = `<img src="svgs/Location.svg" alt=""> ${timezone.location.name}, ${valueOfAPI.sys.country}`

            }

            let timeAPI = fetch(`http://worldtimeapi.org/api/timezone/${timeZone}`)

            timeAPI.then(response => {
                return response.json()
            }).then(value => {
                console.log(value)

                let dayIndex = value.day_of_week
                let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let newDay = daysOfWeek[dayIndex]

                let dateTime = value.datetime

                let hour = dateTime.slice(11, 13)

                getAMPM(hour)

                let Today = dateTime.slice(8, 10)
                let monthFromAPI = dateTime.slice(5, 7)
                let monthIndex = (monthFromAPI / 1) - 1
                let monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let Month = monthNames[monthIndex]
                let year = dateTime.slice(0, 4)

                day.innerHTML = newDay;
                date.innerHTML = `${Today} ${Month}, ${year}`;

                let API_key = "2da794fa96984c5cc13762e8912a1e46"
                let weatherAPI = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`)

                weatherAPI.then((response) => {
                    return response.json()
                }).then((value) => {

                    let countryCode = value.sys.country
                    countryCodeFunc(value)

                    temp.innerHTML = `${((value.main.temp) - 273.15).toFixed(1) / 1} °C`
                    condition.innerHTML = value.weather[0].main
                    humidity.innerHTML = `${value.main.humidity}%`
                    wind.innerHTML = `${((value.wind.speed) * 3.6).toFixed(1)} km/h`



                    function widthSetOfIcon(ImgPara, ValueFromAPI) {
                        if (ValueFromAPI.weather[0].main == "Mist") {
                            ImgPara.setAttribute("style", "width:40px");
                        }
                    }

                    getWeatherIcon(icon, value)
                    widthSetOfIcon(icon, value)


                    let nextDay1 = document.querySelector(".next-day-1")
                    let nextDay2 = document.querySelector(".next-day-2")
                    let nextDay3 = document.querySelector(".next-day-3")
                    let nextDay4 = document.querySelector(".next-day-4")

                    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

                    let shortNewDay1 = weekdays[dayIndex];
                    nextDay1.innerHTML = shortNewDay1;

                    // dayIndex = 6
                    var dayIndex2 = dayIndex + 1;
                    var dayIndex3 = dayIndex + 2;
                    var dayIndex4 = dayIndex + 3;

                    if (dayIndex2 > 6) {
                        dayIndex2 = dayIndex2 - 7;
                    }
                    else if (dayIndex3 > 6) {
                        dayIndex3 = dayIndex3 - 7;
                    }
                    else if (dayIndex4 >= 7) {
                        dayIndex4 = dayIndex4 - 7;
                    }

                    let shortNewDay2 = weekdays[dayIndex2];
                    let shortNewDay3 = weekdays[dayIndex3];
                    let shortNewDay4 = weekdays[dayIndex4];

                    nextDay2.innerHTML = shortNewDay2;
                    nextDay3.innerHTML = shortNewDay3;
                    nextDay4.innerHTML = shortNewDay4;

                    console.log(dayIndex)
                    console.log(dayIndex2)
                    console.log(dayIndex3)
                    console.log(dayIndex4)

                    let nextDayImg1 = document.querySelector(".little-card-1-img")

                    let ComingData = value.weather[0].main

                    getWeatherIcon(nextDayImg1, value)
                    widthSet(nextDayImg1, ComingData)

                    let nextDayTemp1 = document.querySelector(".next-day-temp-1")
                    nextDayTemp1.innerHTML = `${((value.main.temp) - 273.15).toFixed(1) / 1} °C`

                    let apikey = "5a080ba85d624f87a5c171743240904"
                    let DaysForecastAPI = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cityName}&days=4&aqi=no&alerts=no`)

                    DaysForecastAPI.then((response) => {
                        return response.json()
                    }).then((value) => {

                        getForecast(value, nextDayImg2, 1)
                        getForecast(value, nextDayImg3, 2)
                        getForecast(value, nextDayImg4, 3)

                        let ComingData2 = value.forecast.forecastday[1].day.condition.text
                        let ComingData3 = value.forecast.forecastday[2].day.condition.text
                        let ComingData4 = value.forecast.forecastday[3].day.condition.text

                        widthSet(nextDayImg2, ComingData2)
                        widthSet(nextDayImg3, ComingData3)
                        widthSet(nextDayImg4, ComingData4)


                        let nextDayTemp2 = document.querySelector(".next-day-temp-2")
                        let nextDayTemp3 = document.querySelector(".next-day-temp-3")
                        let nextDayTemp4 = document.querySelector(".next-day-temp-4")

                        getForecastTemp(value, nextDayTemp2, 1)
                        getForecastTemp(value, nextDayTemp3, 2)
                        getForecastTemp(value, nextDayTemp4, 3)
                    })

                }).catch(() => {
                    input.classList.add('error')
                })
            })

        }).catch(() => {
            input.classList.add('error')
        })
    }

    if (event.key == "Enter") {
        InputValues()
        input.classList.remove('error')
    }

})

