# Weather Dashboard App

A modern, responsive weather dashboard that delivers real-time weather data with a beautiful Bento Grid UI. Perfect for quickly checking current conditions, forecasts, and weather stats for any city worldwide.

---

## 🖼️ Preview

<!-- Add your screenshots/GIFs here in the /assets folder -->
<!-- Example: ![Dashboard Preview](./assets/dashboard-preview.png) -->

---

## ✨ Features

- **Live Weather Data** — Real-time weather conditions fetched instantly
- **City Search** — Search any city worldwide with instant results
- **Responsive Design** — Seamlessly adapts to desktop, tablet, and mobile
- **Bento Grid UI** — Modern card-based layout inspired by dashboard apps
- **Skeleton Loading** — Smooth loading states for better UX
- **Light/Dark Mode** — Toggle themes with persistent preferences
- **Error Handling** — Graceful handling of invalid cities and API errors
- **Rate Limiting** — Built-in cooldown to prevent API abuse
- **Performance Optimized** — Efficient DOM rendering and caching

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup structure
- **Tailwind CSS (CLI)** — Utility-first styling
- **JavaScript (Vanilla)** — No frameworks, pure ES6+
- **WeatherAPI** — Reliable weather data provider

---

## 📂 Project Structure

```
Weather_App/
├── dist/
│   └── output.css          # Compiled Tailwind CSS
├── src/
│   └── input.css           # Tailwind source
├── index.html              # Main HTML
├── script.js               # App logic
└── tailwind.config.js      # Tailwind config
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Weather_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**
   ```bash
   npm run build
   ```

4. **Open in browser**
   ```bash
   # Option 1: Direct file open
   # Simply open index.html in your browser

   # Option 2: Local server (recommended)
   npx http-server
   # or
   python -m http.server 8000
   ```

---

## 🔑 API Integration

The app uses WeatherAPI for weather data.

**Add your API key in `script.js`:**
```javascript
const API_KEY = 'your_api_key_here';
```

⚠️ **Security Note:**  
For production, never expose API keys in client-side code. Use environment variables or a backend proxy to secure your keys.

---

## 🧠 Key Learnings & Highlights

- **Async/Await** — Modern asynchronous JavaScript patterns
- **API Handling** — Robust fetch with error management
- **UI/UX Design** — Thoughtful component structure and animations
- **Performance** — Caching, debouncing, and optimized rendering
- **Clean Code** — Modular functions and clear separation of concerns

---

## 🛡️ Performance & Security

- **Input Validation** — Sanitized user inputs to prevent XSS
- **Rate Limiting** — 2-second cooldown between requests
- **Error Handling** — User-friendly error messages
- **Optimized DOM** — Minimal re-renders with efficient updates
- **Data Caching** — 10-minute cache to reduce API calls

---

## 📱 Responsiveness

Fully responsive across all devices:
- **Desktop** — Full-featured dashboard layout
- **Tablet** — Adaptive grid system
- **Mobile** — Touch-optimized interface

---

## 🚀 Future Improvements

- Hourly weather forecast
- Interactive weather charts/graphs
- PWA support for offline access
- GPS-based location detection
- Save favorite cities
- Weather alerts and notifications

---

## 👨‍💻 Author

**Krish**

Built with ❤️ and Code

---

## 📄 License

This project is open-source and free to use.
