const apiKey = "1ec55d816b10e4b61d9e310a92600712"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || "City not found");
        });
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon" />
        <p><strong>${main.temp}°C</strong> - ${weather[0].description}</p>
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    });
}
