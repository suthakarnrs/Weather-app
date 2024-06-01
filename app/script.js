const ApiKey = "7dad6d34012a15c9f08794f510b8af10";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const SearchBox = document.querySelector(".search input");
const SearchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to update the current time
function updateTime() {
    const currentTimeElement = document.getElementById("current-time");
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    currentTimeElement.textContent = now.toLocaleDateString('en-US', options);
}

// Call updateTime every second to keep the time updated
setInterval(updateTime, 1000);

async function checkWeather(city) {
    try {
        const response = await fetch(ApiUrl + city + `&appid=${ApiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

            const sunriseTimestamp = data.sys.sunrise * 1000;
            const sunsetTimestamp = data.sys.sunset * 1000;
            const sunrise = new Date(sunriseTimestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
            const sunset = new Date(sunsetTimestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
            document.querySelector(".sunrise").innerHTML = sunrise;
            document.querySelector(".sunset").innerHTML = sunset;

            switch (data.weather[0].main) {
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                case "Snow":
                    weatherIcon.src = "images/snow.png";
                    break;
                case "Wind":
                    weatherIcon.src = "images/wind.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                default:
                    weatherIcon.src = "images/clear.png";
            }

            weatherIcon.classList.add("animate__animated", "animate__fadeIn");
            document.querySelector(".weather").style.display = "block";
        }
    } catch (error) {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".error").innerHTML = "An error occurred. Please try again.";
        document.querySelector(".error").style.display = "block";
    }
}

SearchButton.addEventListener("click", () => {
    if (SearchBox.value.trim() !== "") {
        checkWeather(SearchBox.value);
    }
});

SearchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && SearchBox.value.trim() !== "") {
        checkWeather(SearchBox.value);
    }
});
