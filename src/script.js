function refreshTemp(response) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(response.data.temperature.current)}<span class="celsius">°C</span>`;

  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;

  let emojiElement = document.querySelector("#emoji");
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emoji"/>`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = response.data.wind.speed;

  let timeElement = document.querySelector("#current-date"); 
  let timestamp = response.data.time * 1000; 
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  timeElement.innerHTML = `${day} <strong class="strong">${hours}:${minutes}</strong>`;

  // ✅ Always call getForecast after setting the time
  getForecast(response.data.city);
}

function searchCity(city) { // function to make the API call and update the interface after you received a city from searchSubmit
  let apiKey = "cc05e6fc059ab2a432b067tfa63aoa4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //let cityElement = document.querySelector("#location"); >> transferred to refreshTemp function
  //cityElement.innerHTML = searchInput.value; >> transferred to refreshTemp function
  searchCity(searchInput.value); // value of the search input (by the user) is going to be sent to the function searchCity >> you are receiving a city The city goes inside the function searchCity
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "cc05e6fc059ab2a432b067tfa63aoa4b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastBox = document.querySelector(".forecast-box"); // Select the single box

  //let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let forecastHTML = `<div class="forecast-row">`; // Start the row container

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
  forecastHTML += `
    <div class="forecast-day">
      <span class="day">${formatDay(day.time)}</span>
      <span class="emojis">
        <img src="${day.condition.icon_url}" />
      </span>
      <div class="temperature-container">
        <span class="high">${Math.round(day.temperature.maximum)}°</span>
        <span class="low">${Math.round(day.temperature.minimum)}°</span>
      </div>
    </div>
  `;
   } 
});

  forecastHTML += `</div>`; // Close the row container
  forecastBox.innerHTML = forecastHTML; // Insert content inside the single box
}



searchCity("Bangkok");






