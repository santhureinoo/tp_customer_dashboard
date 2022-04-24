module.exports = {
  content: [
    "./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['MADE TOMMY', 'sans-serif'],
    },
    extend: {
      fontSize: {
        'extraSmall': '8px',
        'custom-xs': '10px',
        'custom-5xl': '40px',
      },
      colors: {
        'pillbtn': '#BCFFD7',
        'custom-gray': '#989AAC',
        'custom-lightgray': '#F5F6F7',
        'custom-darkblue': '#147CFC',
        'custom-lightblue' : '#E8F2FF',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
