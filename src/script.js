//Formating Days

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Forecast Element//

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row"> `;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2" id="days">
              ${formatDay(forecastDay.dt)}
              <img 
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="80"
              />

              <p id="day-temp">${Math.round(forecastDay.temp.max)}°</p>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

//Coordinates call for temp

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aff29a6b33c30edafe99104b632f71d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//Skeleton --->

//Date format for function
function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentDate.getDay()];
  return `${currentDay}`;
}

//Time Format
function formatTime(timestamp) {
  let currentDate = new Date(timestamp);
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentHour}:${currentMinutes}`;
}
//Search Engine Response Call//

function showTemp(response) {
  //City Name//
  console.log(response.data);
  let currentCity = response.data.name;

  //Current//
  let newH1 = document.querySelector("h1");
  newH1.innerHTML = currentCity;

  //Temperature//
  let tempCurrent = Math.round(response.data.main.temp);
  let newTempCel = document.querySelector("#numericalTemp");
  newTempCel.innerHTML = tempCurrent;

  //Humidity//
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  //Wind//
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} mph`;

  //Weather Type//
  let description = document.querySelector("#weatherType");
  description.innerHTML = response.data.weather[0].description;

  //Date//
  let dateElement = document.querySelector("#day");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  //Time//
  let timeElement = document.querySelector("#timeDisplay");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);

  //Icon Element Middle Page//
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// City Default Search

function searchDefault(city) {
  let apiKey = "aff29a6b33c30edafe99104b632f71d7";
  let apiEnd = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEnd}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

//Search Engine section-Event Call//
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  let newH1 = document.querySelector("h1");
  newH1.innerHTML = `${city}`;

  if (city) {
    searchDefault(city);
  } else {
    newH1.innerHTML = `<small>*UNDEFINED CITY*</small>`;
    alert(`Please enter a city`);
  }
}
let form = document.querySelector("#discover-button");
form.addEventListener("click", searchCity);

//Current City Event Call//
function showPosition(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  console.log(lat);
  console.log(long);
  let apiKey = "aff29a6b33c30edafe99104b632f71d7";
  let apiEnd = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEnd}?q=lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrent = document.querySelector("#now-button");
buttonCurrent.addEventListener("click", getPosition);

// Temperature Event CALL//

function celsiTemp(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#numericalTemp");
  let temperature = celsiusTemp.innerHTML;
  celsiusTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

//Search Default Display
searchDefault("London");

//Forecast Call
displayForecast();
