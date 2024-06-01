const ApiKey = "7dad6d34012a15c9f08794f510b8af10";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const SearchBox = document.querySelector(".search input");
const SearchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
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

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

SearchButton.addEventListener("click", () => {
    checkWeather(SearchBox.value);
});
