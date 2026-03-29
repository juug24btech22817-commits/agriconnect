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
          primary: '#10b981',    // Vibrant emerald for primary brand
          secondary: '#f59e0b',  // warm amber for emphasis
          dark: '#064e3b',       // Deep emerald for high-contrast text
          light: '#ecfdf5',      // Pale emerald background
          accent: '#34d399',     // Medium emerald for subtle UI elements
          surface: '#f9fafb',    // Neutral high-end background
          text: '#111827',       // Near black for better readability
          muted: '#6b7280',      // Muted grays for secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.4)',
      },
      backgroundImage: {
        'mesh-gradient': "radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.1) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(245, 158, 11, 0.05) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(16, 185, 129, 0.1) 0, transparent 50%)",
      }
    },
  },
  plugins: [],
}

