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
        "customBg": "black",
        "customHeading": "white",
        "customText": "#9898A0",
        "customButtonText": "black",
        "customButtonBg": "white",
        "customLink": "#757577",
      }
    },
  },
  plugins: [],
}

