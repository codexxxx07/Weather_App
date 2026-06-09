// API Key - Replace with your actual WeatherAPI key
const API_KEY = 'b8fa402c14ea441994e195421260906';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const headerSearchInput = document.getElementById('headerSearchInput');
const headerSearchBtn = document.getElementById('headerSearchBtn');
const headerLocation = document.getElementById('headerLocation');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');
const themeToggle = document.getElementById('themeToggle');

// Weather Elements
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const currentDate = document.getElementById('currentDate');
const currentTime = document.getElementById('currentTime');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feelsLike');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const precipitation = document.getElementById('precipitation');
const forecast = document.getElementById('forecast');

// Main Card Elements
const mainWindSpeed = document.getElementById('mainWindSpeed');
const mainHumidity = document.getElementById('mainHumidity');
const uvIndex = document.getElementById('uvIndex');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Handle skeleton loading screen
    handleSkeletonLoader();
    
    updateDateTime();
    loadDefaultCity();
    setupThemeToggle();
    // Update time every minute
    setInterval(updateDateTime, 60000);
});

// Handle skeleton loading screen
function handleSkeletonLoader() {
    const skeletonLoader = document.getElementById('skeletonLoader');
    const mainContent = document.getElementById('mainContent');
    
    // Show skeleton, hide main content initially
    if (skeletonLoader && mainContent) {
        // After 1.5 seconds, fade out skeleton and fade in main content
        setTimeout(() => {
            skeletonLoader.style.opacity = '0';
            
            // After fade completes, hide skeleton and show main content
            setTimeout(() => {
                skeletonLoader.classList.add('hidden');
                mainContent.classList.remove('hidden');
                // Trigger reflow to enable transition
                void mainContent.offsetWidth;
                mainContent.style.opacity = '1';
            }, 500);
        }, 1500);
    }
}

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    currentDate.textContent = now.toLocaleDateString('en-US', dateOptions);
    currentTime.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

// Load default city
async function loadDefaultCity() {
    await getWeather('London');
}

// Fetch weather data
async function getWeather(city) {
    showLoading(true);
    hideError();
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        updateWeatherUI(data);
        await getForecast(city);
    } catch (error) {
        showError(error.message || 'City not found');
    } finally {
        showLoading(false);
    }
}

// Fetch forecast data
async function getForecast(city) {
    try {
        const response = await fetch(`${API_URL}/forecast.json?key=${API_KEY}&q=${city}&days=4`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        updateForecastUI(data.forecast.forecastday.slice(1, 4));
    } catch (error) {
        console.error('Forecast error:', error);
        // Show placeholder forecast if API fails
        updateForecastUI(null);
    }
}

// Update main weather UI
function updateWeatherUI(data) {
    cityName.textContent = data.location.name;
    countryName.textContent = data.location.country;
    headerLocation.textContent = data.location.name;
    temperature.textContent = `${Math.round(data.current.temp_c)}°`;
    condition.textContent = data.current.condition.text;
    feelsLike.textContent = `Feels like ${Math.round(data.current.feelslike_c)}°`;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.alt = data.current.condition.text;
    
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    precipitation.textContent = `${data.current.precip_mm} mm`;
    
    // Main card elements
    mainWindSpeed.textContent = `${data.current.wind_kph} km/h`;
    mainHumidity.textContent = `${data.current.humidity}%`;
    uvIndex.textContent = data.current.uv;
    visibility.textContent = `${data.current.vis_km} km`;
    pressure.textContent = `Pressure: ${data.current.pressure_mb} mb`;
    
    // Sunrise and sunset from forecast data
    if (data.forecast && data.forecast.forecastday && data.forecast.forecastday[0]) {
        const astro = data.forecast.forecastday[0].astro;
        sunrise.textContent = astro.sunrise;
        sunset.textContent = astro.sunset;
    }
}

// Update forecast UI
function updateForecastUI(forecastData) {
    if (!forecastData) {
        forecast.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 text-sm">
                Forecast unavailable
            </div>
        `;
        return;
    }
    
    forecast.innerHTML = forecastData.map(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = day.day.condition.icon;
        const maxTemp = Math.round(day.day.maxtemp_c);
        const minTemp = Math.round(day.day.mintemp_c);
        
        return `
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                <p class="font-medium text-gray-800 dark:text-gray-100 w-16">${dayName}</p>
                <img src="${icon}" alt="Weather" class="w-8 h-8">
                <div class="flex gap-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">${maxTemp}°</span>
                    <span class="text-gray-500 dark:text-gray-400">${minTemp}°</span>
                </div>
            </div>
        `;
    }).join('');
}

// Show/hide loading state
function showLoading(show) {
    loading.classList.toggle('hidden', !show);
    document.getElementById('mainWeather').classList.toggle('opacity-50', show);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
    errorMessage.classList.add('hidden');
}

// Theme toggle
function setupThemeToggle() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Search functionality
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Header search functionality
if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', handleHeaderSearch);
}
if (headerSearchInput) {
    headerSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleHeaderSearch();
        }
    });
}

async function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        await getWeather(city);
        searchInput.value = '';
    }
}

async function handleHeaderSearch() {
    const city = headerSearchInput.value.trim();
    if (city) {
        await getWeather(city);
        headerSearchInput.value = '';
    }
}
