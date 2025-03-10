function refreshTemp(response) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(response.data.temperature.current)}<span class="celsius">°C</span>`;

  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;

  let emojiElement = document.querySelector("#emoji");
  emojiElement.innerHTML = response.data.condition.icon;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = response.data.wind.speed;

  let timeElement = document.querySelector("#current-date"); // Convert timestamp from API to a readable date/time
  let timestamp = response.data.time * 1000; // Convert to milliseconds
  let date = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];// Format the date
  let day = days[date.getDay()];

  let hours = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`; // Ensure two digits for minutes
  }
  
  timeElement.innerHTML = `${day} <strong class="strong">${hours}:${minutes}</strong>`;
  console.log(response.data);
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

searchCity("Bangkok"); 