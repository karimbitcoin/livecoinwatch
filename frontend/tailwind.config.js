/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#47c2be',
        'primary-dark': '#3ba9a6',
        'primary-light': '#5fd7d3',
        positive: '#22c55e',
        negative: '#ef4444',
        background: '#f8fafc',
        'background-dark': '#0f172a',
        'card': '#ffffff',
        'card-dark': '#1e293b',
        'text': '#334155',
        'text-dark': '#e2e8f0',
        'border': '#e2e8f0',
        'border-dark': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};