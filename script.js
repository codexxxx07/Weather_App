// API Configuration
// Note: For production, use a backend proxy to hide the API key
const API_KEY = 'b8fa402c14ea441994e195421260906';
const API_URL = 'https://api.weatherapi.com/v1';

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

// State Management
let currentCity = '';
let lastRequestTime = 0;
const REQUEST_COOLDOWN_MS = 2000; // 2 seconds cooldown between requests
let debounceTimer = null;
const DEBOUNCE_DELAY_MS = 300; // 300ms debounce for search inputs
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache
const weatherCache = new Map(); // Key: city name (lowercase), Value: { data, timestamp }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    handleSkeletonLoader();
    updateDateTime();
    loadDefaultCity();
    setupThemeToggle();
    setupSearchEventListeners();
    setInterval(updateDateTime, 60000);
    setInterval(cleanupExpiredCache, 60000); // Cleanup cache every minute
});

// Sanitize user input to prevent XSS and invalid data
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    // Remove any HTML tags and trim whitespace
    return input.replace(/<[^>]*>/g, '').trim();
}

// Escape HTML to prevent XSS when inserting dynamic content
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle skeleton loading screen
function handleSkeletonLoader() {
    const skeletonLoader = document.getElementById('skeletonLoader');
    const mainContent = document.getElementById('mainContent');
    
    if (skeletonLoader && mainContent) {
        setTimeout(() => {
            skeletonLoader.style.opacity = '0';
            setTimeout(() => {
                skeletonLoader.classList.add('hidden');
                mainContent.classList.remove('hidden');
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

// Check if request is within cooldown period
function isInCooldown() {
    const now = Date.now();
    return (now - lastRequestTime) < REQUEST_COOLDOWN_MS;
}

// Update last request time
function updateLastRequestTime() {
    lastRequestTime = Date.now();
}

// Get cached weather data if available and not expired
function getCachedWeather(city) {
    const cacheKey = city.toLowerCase();
    const cached = weatherCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION_MS) {
        return cached.data;
    }
    return null;
}

// Cache weather data
function cacheWeather(city, data) {
    const cacheKey = city.toLowerCase();
    weatherCache.set(cacheKey, {
        data,
        timestamp: Date.now()
    });
}

// Cleanup expired cache entries
function cleanupExpiredCache() {
    const now = Date.now();
    for (const [key, value] of weatherCache.entries()) {
        if ((now - value.timestamp) >= CACHE_DURATION_MS) {
            weatherCache.delete(key);
        }
    }
}

// Fetch weather data
async function getWeather(city) {
    const sanitizedCity = sanitizeInput(city);
    
    if (!sanitizedCity) {
        showError('Please enter a valid city name');
        return;
    }

    // Check cache first
    const cachedData = getCachedWeather(sanitizedCity);
    if (cachedData) {
        updateWeatherUI(cachedData);
        updateForecastUI(cachedData.forecast?.forecastday?.slice(1, 4) || null);
        return;
    }

    // Check cooldown
    if (isInCooldown()) {
        const remainingTime = Math.ceil((REQUEST_COOLDOWN_MS - (Date.now() - lastRequestTime)) / 1000);
        showError(`Please wait ${remainingTime} second${remainingTime !== 1 ? 's' : ''} before making another request`);
        return;
    }

    showLoading(true);
    hideError();
    
    try {
        updateLastRequestTime();
        
        const response = await fetch(`${API_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(sanitizedCity)}&days=4&aqi=no&alerts=no`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        // Cache the data
        cacheWeather(sanitizedCity, data);
        
        updateWeatherUI(data);
        updateForecastUI(data.forecast?.forecastday?.slice(1, 4) || null);
        currentCity = sanitizedCity;
    } catch (error) {
        showError(error.message || 'City not found');
    } finally {
        showLoading(false);
    }
}

// Update main weather UI
function updateWeatherUI(data) {
    if (!data || !data.location || !data.current) {
        return;
    }

    // Use textContent for safe updates
    cityName.textContent = data.location.name || '--';
    countryName.textContent = data.location.country || '--';
    headerLocation.textContent = data.location.name || '--';
    temperature.textContent = `${Math.round(data.current.temp_c || 0)}°`;
    condition.textContent = data.current.condition?.text || 'Unknown';
    feelsLike.textContent = `Feels like ${Math.round(data.current.feelslike_c || 0)}°`;
    
    // Only set src if valid URL
    if (data.current.condition?.icon) {
        weatherIcon.src = data.current.condition.icon;
        weatherIcon.alt = data.current.condition.text || 'Weather Icon';
    }
    
    humidity.textContent = `${data.current.humidity || 0}%`;
    windSpeed.textContent = `${data.current.wind_kph || 0} km/h`;
    precipitation.textContent = `${data.current.precip_mm || 0} mm`;
    
    mainWindSpeed.textContent = `${data.current.wind_kph || 0} km/h`;
    mainHumidity.textContent = `${data.current.humidity || 0}%`;
    uvIndex.textContent = data.current.uv || '--';
    visibility.textContent = `${data.current.vis_km || 0} km`;
    pressure.textContent = `Pressure: ${data.current.pressure_mb || 0} mb`;
    
    if (data.forecast && data.forecast.forecastday && data.forecast.forecastday[0]) {
        const astro = data.forecast.forecastday[0].astro;
        sunrise.textContent = astro?.sunrise || '--:--';
        sunset.textContent = astro?.sunset || '--:--';
    }
}

// Update forecast UI
function updateForecastUI(forecastData) {
    if (!forecastData || !Array.isArray(forecastData)) {
        forecast.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 text-sm">
                Forecast unavailable
            </div>
        `;
        return;
    }
    
    // Build HTML safely using escapeHtml
    let html = '';
    for (const day of forecastData) {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = day.day?.condition?.icon || '';
        const maxTemp = Math.round(day.day?.maxtemp_c || 0);
        const minTemp = Math.round(day.day?.mintemp_c || 0);
        
        html += `
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300">
                <p class="font-medium text-gray-800 dark:text-gray-100 w-16">${escapeHtml(dayName)}</p>
                ${icon ? `<img src="${escapeHtml(icon)}" alt="Weather" class="w-8 h-8">` : '<div class="w-8 h-8"></div>'}
                <div class="flex gap-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-100">${maxTemp}°</span>
                    <span class="text-gray-500 dark:text-gray-400">${minTemp}°</span>
                </div>
            </div>
        `;
    }
    forecast.innerHTML = html;
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

// Setup search event listeners with debounce
function setupSearchEventListeners() {
    // Search button and enter key
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Header search button and enter key
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
}

async function handleSearch() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(async () => {
        const city = searchInput.value.trim();
        if (city) {
            await getWeather(city);
            searchInput.value = '';
        }
    }, DEBOUNCE_DELAY_MS);
}

async function handleHeaderSearch() {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(async () => {
        const city = headerSearchInput.value.trim();
        if (city) {
            await getWeather(city);
            headerSearchInput.value = '';
        }
    }, DEBOUNCE_DELAY_MS);
}
