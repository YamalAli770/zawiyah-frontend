/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "custom": "90rem"
      },
      colors: {
        "customBg": "#E3FDFD",
        "customButton": "#37868B"
      }
    },
  },
  plugins: [],
}

