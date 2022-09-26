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
function changeSeasons(month) {
  let bodyBackground = document.querySelector("body");
  let appBackground = document.querySelector(".weather-app");
  if (month === 11 || month < 2) {
    bodyBackground.classList.add("winter") &&
      appBackground.classList.add("winter");
  } else if (month > 1 && month < 5) {
    bodyBackground.classList.add("spring") &&
      appBackground.classList.add("spring");
  } else if (month > 4 && month < 8) {
    bodyBackground.classList.add("summer") &&
      appBackground.classList.add("summer");
  } else if (month > 7 && month < 11) {
    bodyBackground.classList.add("autumn") &&
      appBackground.classList.add("autumn");
  }
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col" id="day-weather">
    <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
          <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="cloud"
          class="weather-forecast-icon"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
  </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "738993d32099f81cb584e637be73ea30";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(response.data.coord);
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
function searchForCurrentlocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiKey = "738993d32099f81cb584e637be73ea30";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherInformation);
}
function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchForCurrentlocation);
}

function tryWinterImage() {
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/262/original/aaron-burden-ejUU3U7Rlns-unsplash.jpg?1663255208')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}
function trySpringImage() {
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/261/original/sergey-shmidt-koy6FlCCy5s-unsplash.jpg?1663255187')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}
function trySummerImage() {
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/120/original/summer.jpg?1663063490')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}
function tryAutumnImage() {
  document.body.style.backgroundImage =
    "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/046/118/original/autumn.jpg?1663063469')";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}
document
  .querySelector("#submit-button")
  .addEventListener("click", handleSubmit);
document
  .querySelector("#search-button")
  .addEventListener("click", getCurrentLocation);
document.querySelector("#winter").addEventListener("click", tryWinterImage);
document.querySelector("#spring").addEventListener("click", trySpringImage);
document.querySelector("#summer").addEventListener("click", trySummerImage);
document.querySelector("#autumn").addEventListener("click", tryAutumnImage);
changeSeasons(new Date().getMonth());
search("Kyiv");
