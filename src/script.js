function refreshTemp(response) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${Math.round(response.data.temperature.current)}<span class="celsius">°C</span>`;
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.city;
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