function showSearchBar() {
  document.querySelector(".search-bar").style.transition = "all 3s linear";
  document.querySelector(".search-bar").style.width = "480px";
}
document.getElementById("search-btn").addEventListener("click", showSearchBar);

function displayCurrentLocation() {
  function showTemp(response) {
    let city = document.querySelector("#city");
    let currentLocation = response.data.name;
    let currentDegree = Math.round(response.data.main.temp);
    let changeDegree = document.querySelector("#current-degree");
    city.innerHTML = currentLocation;
    changeDegree.innerHTML = currentDegree;
  }
  function describeWeather(response) {
    let currentHour = currentDate.getHours();
    let hourlyHumidity = response.data.hourly[currentHour].humidity;
    let humidity = document.querySelector("#humidity-percentage");
    humidity.innerHTML = `${hourlyHumidity}%`;
    let hourlyPrecipitation = Math.round(
      response.data.hourly[currentHour].pop * 100
    );
    let precipitation = document.querySelector("#precipitation-percentage");
    precipitation.innerHTML = `${hourlyPrecipitation}%`;
    let hourlyWinSpeed = Math.round(
      response.data.hourly[currentHour].wind_speed * 3.6
    );
    let winSpeed = document.querySelector("#win-speed-kilometer-per-hour");
    winSpeed.innerHTML = `${hourlyWinSpeed}km/h`;
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
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `f5029b784306910c19746e40c14d6cd3`;
    let units = `metric`;
    let currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    let hourlyApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(currentApi).then(showTemp);
    axios.get(hourlyApi).then(describeWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let popup = document.querySelector(".current-location-icon");
popup.addEventListener("click", displayCurrentLocation, true);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  function describeWeather(response) {
    let currentHour = currentDate.getHours();
    let hourlyHumidity = response.data.hourly[currentHour].humidity;
    let humidity = document.querySelector("#humidity-percentage");
    humidity.innerHTML = `${hourlyHumidity}%`;
    let hourlyPrecipitation = Math.round(
      response.data.hourly[currentHour].pop * 100
    );
    let precipitation = document.querySelector("#precipitation-percentage");
    precipitation.innerHTML = `${hourlyPrecipitation}%`;
    let hourlyWinSpeed = Math.round(
      response.data.hourly[currentHour].wind_speed * 3.6
    );
    let winSpeed = document.querySelector("#win-speed-kilometer-per-hour");
    winSpeed.innerHTML = `${hourlyWinSpeed}km/h`;
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
  function showTemp(response) {
    let currentDegree = Math.round(response.data.main.temp);
    let changeDegree = document.querySelector("#current-degree");
    changeDegree.innerHTML = currentDegree;
    city.innerHTML = response.data.name;
    let cityLatitude = response.data.coord.lat;
    let cityLongitude = response.data.coord.lon;
    let hourlyApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}`;
    axios.get(hourlyApi).then(describeWeather);
  }
  let apiKey = `f5029b784306910c19746e40c14d6cd3`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
let submitButton = document.querySelector("#search-form");
submitButton.addEventListener("submit", searchCity);

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
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = formatDate(currentDate);
