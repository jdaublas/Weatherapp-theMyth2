function getNewTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "6dfa8826ffc57f6f6137d36396323455";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function displayWeatherCondition(response) {
  celciusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("#image");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  console.log(response.data);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celciuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let faherenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(faherenheitTemperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

//getNewTime
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = getNewTime(currentTime);

//searchCity & handlesubmit
let searchFrom = document.querySelector("#search-form");
searchFrom.addEventListener("submit", handleSubmit);

//convert to °F
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", convertToFahrenheit);

//convert to °C
let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", convertToCelcius);

searchCity("El Salvador");
