# Weather App

A modern, responsive weather dashboard built with HTML, Tailwind CSS, and JavaScript featuring a beautiful Bento Grid UI layout.

## Features

- **Bento Grid Layout**: Clean, card-based design inspired by modern dashboard apps
- **Real-time Weather Data**: Current weather conditions for any city
- **3-Day Forecast**: Preview upcoming weather
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Optimized for mobile and desktop
- **Smooth Animations**: Hover effects and transitions for a polished UX
- **Weather Stats**: Humidity, wind speed, and precipitation data

## Setup Instructions

1. **Get a free API Key from WeatherAPI**:
   - Visit [https://www.weatherapi.com/](https://www.weatherapi.com/)
   - Sign up for a free account
   - Copy your API key

2. **Update the API Key**:
   - Open `script.js`
   - Replace `YOUR_API_KEY` with your actual WeatherAPI key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

3. **Open the App**:
   - Simply open `index.html` in your browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

## Project Structure

```
Weather_App/
├── dist/
│   └── output.css          # Compiled Tailwind CSS
├── src/
│   └── input.css           # Tailwind source file
├── index.html              # Main HTML file
├── script.js               # JavaScript logic
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Development

To rebuild the CSS after making changes:

```bash
npm run build
```

To watch for CSS changes during development:

```bash
npm run watch
```

## API Integration

The app uses the WeatherAPI:
- Current weather: `https://api.weatherapi.com/v1/current.json`
- Forecast: `https://api.weatherapi.com/v1/forecast.json`

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (Vanilla)**: No frameworks, pure JS
- **WeatherAPI**: Weather data provider

## UI Features

- **Gradient Background**: Beautiful blue/purple gradient on main card
- **Hover Effects**: Cards scale slightly on hover
- **Loading States**: Spinner animation during API calls
- **Error Handling**: User-friendly error messages
- **Theme Persistence**: Dark mode preference saved to localStorage

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid
- CSS Custom Properties (variables)
