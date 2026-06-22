/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#0F766E",     // Teal 700
        secondary: "#14B8A6",   // Teal 500
        accent: "#F59E0B",      // Amber 500

        // Backgrounds
        lightBg: "#F8FAFC",     // Slate 50
        darkBg: "#020617",      // Slate 950

        // Cards
        cardLight: "#FFFFFF",
        cardDark: "#0F172A",

        // Text
        textLight: "#0F172A",
        textDark: "#F8FAFC",

        // Muted Text
        mutedLight: "#64748B",
        mutedDark: "#94A3B8",
      },
    },
  },

  plugins: [],
}