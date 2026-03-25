/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          green: '#2e7d32',   // Vibrant agriculture green
          brown: '#5d4037',   // Earthy brown
          yellow: '#fbc02d',  // Light yellow/sunshine
          light: '#f1f8e9',   // Light green background
          dark: '#1b5e20',    // Dark green
        }
      }
    },
  },
  plugins: [],
}

