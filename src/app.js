function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = date.getDate();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  let year = date.getFullYear();
  return `${day}, ${currentDate} ${month} ${year}`;
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector(".weather-forecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class="weather-forecast-day">${day}</div>
          <img
          src="https://openweathermap.org/img/wn/03d@2x.png"
          alt="cloud"
          width="42px"
          class="weather-forecast-icon"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 15°</span>
            <span class="weather-forecast-temperature-min"> 10°</span>
          </div>
  </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeatherInformation(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#time").innerHTML = formatTime(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", `response.data.weather[0].main`);
}

function search(city) {
  let apiKey = "738993d32099f81cb584e637be73ea30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  search(document.querySelector("#search-form-input").value);
}
function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperaureElement = document.querySelector("#temperature");
  temperaureElement.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperaureElement = document.querySelector("#temperature");
  temperaureElement.innerHTML = Math.round(celsiusTemperature);
}

document
  .querySelector("#submit-button")
  .addEventListener("click", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

displayForecast();
search("Kyiv");
