# Weather Dashboard App

A modern, production-ready weather dashboard that delivers real-time weather data with an elegant Bento Grid UI. Built with performance and security in mind, this application provides instant access to current conditions, 3-day forecasts, and comprehensive weather metrics for any city worldwide.

**Why it matters:** Weather apps are essential tools for daily planning, travel, and outdoor activities. This dashboard combines beautiful design with robust engineering to deliver a seamless user experience across all devices.

---

## 🖼️ Preview

Example: ![Light Mode](/assets/LightMode.png)
Example: ![Dark Mode](/assets/DarkMode.png)

---

## ✨ Features

- **Live Weather Data** — Real-time weather conditions fetched instantly from WeatherAPI
- **City Search** — Search any city worldwide with instant results and autocomplete support
- **Responsive Design** — Seamlessly adapts to desktop, tablet, and mobile viewports
- **Bento Grid UI** — Modern card-based layout inspired by dashboard applications
- **Skeleton Loading States** — Smooth loading animations for enhanced perceived performance
- **Light/Dark Mode** — Toggle themes with persistent localStorage preferences
- **Error Handling** — Graceful handling of invalid cities, network errors, and API failures
- **Rate Limiting** — Built-in 2-second cooldown to prevent API abuse and optimize costs
- **Performance Optimizations** — Data caching (10-minute TTL), debounced inputs, and efficient DOM updates
- **Input Sanitization** — XSS prevention through HTML escaping and input validation
- **3-Day Forecast** — Extended weather predictions with high/low temperatures
- **Comprehensive Metrics** — Humidity, wind speed, UV index, visibility, pressure, sunrise/sunset

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup structure with accessibility best practices
- **Tailwind CSS (CLI)** — Utility-first styling with custom design system
- **JavaScript (Vanilla ES6+)** — No frameworks, pure modern JavaScript
- **Node.js** — Backend proxy server for secure API integration
- **WeatherAPI** — Reliable, high-accuracy weather data provider

---

## 📂 Project Structure

```
Weather_App/
├── dist/
│   └── output.css          # Compiled Tailwind CSS
├── src/
│   └── input.css           # Tailwind source with custom directives
├── index.html              # Main application markup
├── script.js               # Client-side application logic
├── server.js               # Node.js proxy server for API calls
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Project dependencies and scripts
└── .env.example            # Environment variables template
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Weather_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API key**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Add your WeatherAPI key:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key at: [weatherapi.com](https://www.weatherapi.com/)

4. **Build Tailwind CSS**
   ```bash
   npm run build
   ```

   For development with auto-reload:
   ```bash
   npm run watch
   ```

5. **Start the application**
   
   **Option 1: With Node.js server (Recommended for production)**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`
   
   **Option 2: Static file serving**
   ```bash
   npx http-server
   # or
   python -m http.server 8000
   ```

---

## 🔑 API Integration

This application uses WeatherAPI for weather data. The API integration is designed with security best practices:

### Client-Side Usage
For development, the API key can be set directly in `script.js`:
```javascript
const API_KEY = 'your_api_key_here';
```

### Server-Side Proxy (Production)
For production deployments, use the included Node.js server (`server.js`) which:
- Proxies API requests to hide your API key
- Handles CORS headers
- Provides a secure backend layer
- Reads API key from environment variables

⚠️ **Security Warning:**  
Never commit API keys to version control. Always use environment variables or a backend proxy in production. The `.env` file is included in `.gitignore` for this reason.

---

## 🧠 Key Learnings & Highlights

### Engineering Practices
- **Async/Await Patterns** — Modern asynchronous JavaScript with proper error handling
- **API Integration** — Robust fetch implementation with retry logic and timeout handling
- **State Management** — Clean state handling with caching and cooldown mechanisms
- **Input Validation** — Comprehensive sanitization to prevent XSS attacks
- **Debouncing** — Optimized search input handling to reduce unnecessary API calls

### UI/UX Design
- **Component Architecture** — Modular card-based layout with consistent spacing
- **Micro-interactions** — Smooth transitions and hover effects for enhanced engagement
- **Loading States** — Skeleton screens that match the final layout for perceived performance
- **Accessibility** — Semantic HTML and keyboard navigation support
- **Dark Mode** — System-aware theme switching with user preference persistence

### Performance Optimization
- **Data Caching** — 10-minute in-memory cache reduces API calls by up to 90%
- **Request Debouncing** — 300ms delay on search inputs prevents rapid-fire requests
- **Rate Limiting** — 2-second cooldown prevents API abuse and optimizes costs
- **Efficient DOM Updates** — Minimal re-renders using textContent instead of innerHTML where possible
- **CSS Optimization** — Tailwind's purge removes unused styles for smaller bundle size

---

## 🛡️ Performance & Security

### Security Measures
- **Input Sanitization** — All user inputs are sanitized to prevent XSS attacks
- **HTML Escaping** — Dynamic content is escaped before DOM insertion
- **API Key Protection** — Server proxy option to hide credentials in production
- **CORS Handling** — Proper cross-origin resource sharing configuration
- **Error Boundaries** — Graceful degradation when APIs fail

### Performance Optimizations
- **Request Cooldown** — 2-second minimum between API calls
- **Data Caching** — 10-minute TTL cache for frequently accessed cities
- **Lazy Loading** — Skeleton screens improve perceived performance
- **Debounced Inputs** — Reduces unnecessary API requests during typing
- **Optimized Rendering** — Efficient DOM manipulation patterns

### Code Quality
- **Modular Architecture** — Clear separation of concerns between functions
- **Error Handling** — Comprehensive try-catch blocks with user-friendly messages
- **Clean Code Principles** — Descriptive function names and single responsibility
- **No Framework Dependencies** — Lightweight vanilla JavaScript implementation

---

## 📱 Responsiveness

The application is fully responsive across all device sizes:

- **Desktop (1024px+)** — Full-featured dashboard with 3-column Bento Grid layout
- **Tablet (768px-1023px)** — Adaptive 2-column grid with optimized spacing
- **Mobile (<768px)** — Single-column layout with touch-optimized controls and collapsible elements

---

## 🚀 Future Improvements

Planned enhancements for future versions:

- **Hourly Forecast** — Detailed 24-hour weather predictions
- **Interactive Charts** — Temperature and precipitation graphs using Chart.js
- **PWA Support** — Offline access and installable desktop/mobile app
- **Geolocation API** — Automatic location detection with user permission
- **Saved Cities** — Bookmark favorite locations for quick access
- **Weather Alerts** — Severe weather notifications and warnings
- **Historical Data** — Weather history and trends visualization
- **Multi-language Support** — Internationalization (i18n) for global users
- **Unit Conversion** — Toggle between Celsius/Fahrenheit and metric/imperial
- **Weather Maps** — Interactive radar and satellite imagery integration

---

## 👨‍💻 Author

**Krish**

Built with ❤️ and Code

---

## 📄 License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it for personal or commercial projects.

---

## 🧩 Internship Note

Built as part of a hands-on internship, emphasizing real-world problem solving, performance optimization, and modern UI/UX practices.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For questions, issues, or suggestions, please open an issue on the repository or contact the author directly.

---

**Built with modern web technologies and best practices.**
