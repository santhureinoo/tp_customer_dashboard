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
        'custom-subtitle' : '13px',
      },
      colors: {
        'pillbtn': '#BCFFD7',
        'custom-gray': '#989AAC',
        'custom-lightgray': '#F5F6F7',
        'custom-darkblue': '#147CFC',
        'custom-lightblue' : '#E8F2FF',
        'custom-blue-card' : '#E8F2FF',
        'custom-blue-card-font': '#147CFC',
        'custom-red-card' : '#FDD3DB',
        'custom-red-card-font': '#ED113C',
        'custom-green-card' : '#E9F9EF',
        'custom-green-card-font': '#1FBF5F',
        'custom-orange-card' : '#FFF1E5',
        'custom-orange-card-font': '#FF6F00',
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
