/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#102523",
        ivory: "#F5F0E8",
        brass: "#B79A68",
        wood: "#8A6748",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 70px rgba(16,37,35,.14)",
      },
    },
  },
  plugins: [],
};
