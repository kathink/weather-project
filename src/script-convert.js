function showPopup() {
  document.querySelector(".pop-up-content").style.display = "block";
}
function hidePopup() {
  document.querySelector(".pop-up-content").style.display = "none";
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  let favouriteCity = document.querySelector("#favourite-city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
    favouriteCity.innerHTML = `${searchInput.value}`;
    hidePopup();
  } else {
    city.innerHTML = null;
    alert("Please enter a city name");
  }
}
function convertFahrenheit(event) {
  event.preventDefault();
  let degree = document.querySelector("#current-degree");
  degree.innerHTML = "92";
}
function convertCelcius(event) {
  event.preventDefault();
  let degree = document.querySelector("#current-degree");
  degree.innerHTML = "33";
}
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

let popup = document.querySelector(".pop-up-icon");
popup.addEventListener("click", showPopup);
let currentDate = new Date();
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = formatDate(currentDate);
let submitButton = document.querySelector("#search-form");
submitButton.addEventListener("submit", searchCity);
let celciusConvert = document.querySelector("#celcius");
celciusConvert.addEventListener("click", convertCelcius);
let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", convertFahrenheit);
