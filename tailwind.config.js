module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    minWidth:{
      'twelve-rem':'12rem'
    }
   
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
