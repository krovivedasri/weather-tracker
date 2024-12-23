const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    // Fetch weather for a default city on page load
    weatherFn('Pune');
});

// Function to fetch weather data for a given city
async function weatherFn(cName) {
    const temp = `${url}?q=${encodeURIComponent(cName)}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(temp);
        const data = await res.json();

        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert(data.message || 'City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred. Please check your internet connection and try again.');
    }
}

// Function to display weather data and icons
function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp.toFixed(1)}°C`);
    $('#description').text(capitalizeFirstLetter(data.weather[0].description));
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed.toFixed(1)} m/s`);

    // Set the weather icon dynamically based on the API response
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    $('#weather-icon').attr('src', iconUrl).show();

    // Show the weather info section with animation
    $('#weather-info').fadeIn();
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
