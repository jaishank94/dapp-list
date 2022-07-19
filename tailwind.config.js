/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-voilet': '#c6c6e4',
      },
    },
    // colors: {
    //   'custom-color': '#2D3035',
    //   'white': '#ffffff',
    // },
    // width: {
    //   '50': '50px',
    // }
  },
  plugins: [],
}
