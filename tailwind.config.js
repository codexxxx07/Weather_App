/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'layered': '0 10px 20px rgba(0,0,0,0.08), 0 20px 40px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.05)',
        'layered-hover': '0 20px 40px rgba(0,0,0,0.12), 0 30px 60px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
