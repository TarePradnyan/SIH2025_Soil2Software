document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch weather data (this is a placeholder)
    function fetchWeather() {
        const weatherInfoElement = document.getElementById('weatherInfo');
        
        // This would be replaced with a real API call
        // For example, fetching user's location-based weather
        
        // Placeholder data for demonstration
        weatherInfoElement.innerHTML = `
            <p><strong>Ludhiana, Punjab</strong></p>
            <p>Temperature: 25°C</p>
            <p>Condition: Partly Cloudy</p>
        `;
    }

    fetchWeather();
});