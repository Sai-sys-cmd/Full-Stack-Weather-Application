let weatherChart;

document.getElementById('getWeatherBtn').addEventListener('click', function () {
    let city = document.getElementById('city').value;
    let apiKey = '61b6c230b769c72918fa07029402f581';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('errorMessage').innerText = '';
    document.getElementById('weatherDetails').style.display = 'none';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weatherDesc').innerText = `Condition: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

            const iconCode = data.weather[0].icon;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}.png`;

            document.getElementById('weatherDetails').style.display = 'block';

            const chartData = {
                labels: ['Temperature', 'Humidity', 'Wind Speed'],
                datasets: [{
                    label: 'Weather Data',
                    data: [data.main.temp, data.main.humidity, data.wind.speed],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderWidth: 1,
                }]
            };

            if (weatherChart) {
                weatherChart.data = chartData;
                weatherChart.update();
            } else {
                const ctx = document.getElementById('weatherChart').getContext('2d');
                weatherChart = new Chart(ctx, {
                    type: 'bar',
                    data: chartData,
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').innerText = 'City not found. Please try again.';
        });
});