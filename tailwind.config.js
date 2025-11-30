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
}

  },
  plugins: [],
};
extend: {
  animation: {
    "spin-slow": "spin 6s linear infinite",
  }
}

