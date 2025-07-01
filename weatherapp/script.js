document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const cityDisplay = document.getElementById("cityName");
  const tempDisplay = document.getElementById("temperature");
  const descDisplay = document.getElementById("description");
  const weatherBox = document.getElementById("weatherInfo");
  const toggleBtn = document.getElementById("toggleDarkMode");

  getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") return;

    const apiKey = ""; // 🔁 Replace with your OpenWeatherMap key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        cityDisplay.textContent = `📍 ${data.name}`;
        tempDisplay.textContent = `🌡️ ${data.main.temp}°C`;
        descDisplay.textContent = `🌤️ ${data.weather[0].description}`;
        weatherBox.style.display = "block";
        cityInput.value = "";
      })
      .catch((error) => {
        weatherBox.style.display = "none";
        alert(error.message);
      });
  });

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });
});
