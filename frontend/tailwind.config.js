/** @type {import('tailwindcss').Config} */

// Colors come from CSS variables in src/index.css, so one palette serves light and dark mode.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Design system (editorial: ivory, deep green, brass)
        bg: v("bg"),
        surface: v("surface"),
        surface2: v("surface-2"),
        ink: v("ink"),
        muted: v("muted"),
        line: v("line"),
        primaryInk: v("primary-ink"),
        primaryHover: v("primary-hover"),
        brass: v("brass"),
        brassSoft: v("brass-soft"),
        danger: v("danger"),
        success: v("success"),

        // Existing names, kept so current classes keep working; they now follow the palette.
        primary: v("primary"),
        secondary: v("primary-hover"),
        accent: v("brass"),
        lightBg: v("bg"),
        darkBg: v("bg"),
        cardLight: v("surface"),
        cardDark: v("surface"),
        textLight: v("ink"),
        textDark: v("ink"),
        mutedLight: v("muted"),
        mutedDark: v("muted"),
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--shadow) / 0.05), 0 12px 32px -18px rgb(var(--shadow) / 0.18)",
        lift: "0 2px 4px rgb(var(--shadow) / 0.06), 0 24px 48px -22px rgb(var(--shadow) / 0.32)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scale-in": { from: { opacity: "0", transform: "scale(.97)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        "fade-up": "fade-up .5s cubic-bezier(.2,.7,.2,1) both",
        "fade-in": "fade-in .4s ease-out both",
        "scale-in": "scale-in .25s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },

  plugins: [],
}
