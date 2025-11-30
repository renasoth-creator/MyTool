/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#F97316",
        "primary-dark": "#1E293B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        blob: "blob 7s infinite ease-in-out",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(25px,-20px) scale(1.15)" },
          "66%": { transform: "translate(-20px,15px) scale(0.9)" },
          "100%": { transform: "translate(0,0) scale(1)" }
        }
      }
    },
  },
  plugins: [],
};
