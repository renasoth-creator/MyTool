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
             "primary-dark": "#ffffff",
  },
  fontFamily: {
      sans: ["Inter", "sans-serif"],
  },
}

  },
  plugins: [],
};
