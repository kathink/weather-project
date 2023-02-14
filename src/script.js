function showSearchBar() {
  document.querySelector(".search-bar").style.transition = "all 3s linear";
  document.querySelector(".search-bar").style.width = "480px";
}
document
  .getElementById("search-btn")
  .addEventListener("mouseover", showSearchBar);

function displayCurrentLocation() {
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `6782253072f7d90462731a624097fc54`;
    let units = `metric`;
    let currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    let hourlyApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(currentApi).then(showTemp);
    axios.get(hourlyApi).then(describeWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
document
  .querySelector(".current-location-icon")
  .addEventListener("click", displayCurrentLocation, true);

function describeWeather(response) {
  let currentHour = currentDate.getHours();
  let hourlyHumidity = response.data.hourly[currentHour].humidity;
  let hourlyPrecipitation = Math.round(
    response.data.hourly[currentHour].pop * 100
  );
  document.querySelector(
    "#humidity-percentage"
  ).innerHTML = `${hourlyHumidity}%`;
  document.querySelector(
    "#precipitation-percentage"
  ).innerHTML = `${hourlyPrecipitation}%`;
  let hourlyWinSpeed = Math.round(
    response.data.hourly[currentHour].wind_speed * 3.6
  );
  document.querySelector(
    "#win-speed-kilometer-per-hour"
  ).innerHTML = `${hourlyWinSpeed}km/h`;
  let hourlyUvi = response.data.hourly[currentHour].uvi;
  let uvIndex = document.querySelector("#uv-index");
  if (hourlyUvi < 2) {
    uvIndex.innerHTML = "Low";
  } else if (3 < hourlyUvi < 5) {
    uvIndex.innerHTML = "Moderate";
  } else if (6 < hourlyUvi < 7) {
    uvIndex.innerHTML = "High";
  } else if (8 < hourlyUvi < 10) {
    uvIndex.innerHTML = "Very High";
  } else {
    uvIndex.innerHTML = "Extreme";
  }
}
function formatDateForecast(timestamp) {
  let day = new Date(timestamp * 1000).getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecastElement = document.getElementById("forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
      <h4>${formatDateForecast(forecastDay.dt)}</h4>
      <img src="images/${
        forecastDay.weather[0].icon
      }.png" alt="storm icon" class="weather-icon" />
      <div class="degree"> <strong>${Math.round(
        forecastDay.temp.max
      )}°</strong> ${Math.round(forecastDay.temp.min)}°</div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showTemp(response) {
  let currentDegree = Math.round(response.data.main.temp);
  let currentIcon = document.querySelector("#current-weather-icon");
  currentCelcius = response.data.main.temp;
  document.querySelector("#current-degree").innerHTML = currentDegree;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  currentIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
  let cityLatitude = response.data.coord.lat;
  let cityLongitude = response.data.coord.lon;
  let apiKey = `6782253072f7d90462731a624097fc54`;
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=metric`;
  axios.get(oneCallApi).then(describeWeather);
  axios.get(oneCallApi).then(displayForecast);
}
function searchCity(city) {
  let apiKey = `6782253072f7d90462731a624097fc54`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  searchCity(searchInput);
}
document.querySelector("#search-form").addEventListener("submit", handleSubmit);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = String(date.getHours()).padStart(2, "0");
  let currentMinutes = String(date.getMinutes()).padStart(2, "0");
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}
let currentDate = new Date();
document.querySelector("#date-time").innerHTML = formatDate(currentDate);
searchCity("London");
