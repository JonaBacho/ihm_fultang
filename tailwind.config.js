/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-start': '#1A73A3',  // Couleur de début du dégradé
        'primary-end': '#50C2B9',     // Couleur de fin du dégradé
         secondary : "#051161"
      }
    },
  },
  plugins: [],
}