/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        script: ['"Caveat"', "cursive"],
      },
      colors: {
        midnight: "var(--c-bg)",
        burgundy: "var(--c-burgundy)",
        rose: "var(--c-rose)",
        warm: "var(--c-warm)",
        gold: "var(--c-gold)",
      },
    },
  },
  plugins: [],
};
