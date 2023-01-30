function showSearchBar() {
  document.querySelector(".search-bar").style.transition = "all 3s linear";
  document.querySelector(".search-bar").style.width = "480px";
}
document.getElementById("search-btn").addEventListener("click", showSearchBar);

function displayCurrentLocation() {
  function showTemp(response) {
    let currentLocation = response.data.name;
    let currentDegree = Math.round(response.data.main.temp);
    document.querySelector("#current-degree").innerHTML = currentDegree;
    document.querySelector("#city").innerHTML = currentLocation;
  }
  function describeWeather(response) {
    let currentHour = currentDate.getHours();
    let hourlyHumidity = response.data.hourly[currentHour].humidity;
    let hourlyPrecipitation = Math.round(
      response.data.hourly[currentHour].pop * 100
    );
    let hourlyWinSpeed = Math.round(
      response.data.hourly[currentHour].wind_speed * 3.6
    );
    document.querySelector(
      "#humidity-percentage"
    ).innerHTML = `${hourlyHumidity}%`;
    document.querySelector(
      "#precipitation-percentage"
    ).innerHTML = `${hourlyPrecipitation}%`;
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
function showTemp(response) {
  let currentDegree = Math.round(response.data.main.temp);
  document.querySelector("#current-degree").innerHTML = currentDegree;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let cityLatitude = response.data.coord.lat;
  let cityLongitude = response.data.coord.lon;
  let apiKey = `f5029b784306910c19746e40c14d6cd3`;
  let hourlyApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}`;
  axios.get(hourlyApi).then(describeWeather);
}
function searchCity(city) {
  let apiKey = `f5029b784306910c19746e40c14d6cd3`;
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
