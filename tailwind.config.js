module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '375px',
      'md': '843px',
      'lg': '1024px',
      'xl': '1920px'
    },
    fontFamily: {
      'default': ['Poppins', 'Arial', 'sans-serif']
    },
    extend: {
      colors: {
        'pop-white': '#F8F7EE',
        'pop-black': '#2D2D2D',
        'pop-gray': '#DFDFDF',
        'pop-navy': '#212363',
        'pop-green': '#64FFE3',
        'pop-green-pale': '#E8FDF5',
        'pop-pink': '#FF0088',
        'pop-pink-pale': '#CDF2F4',
        'pop-blue': '#3A3EAB',
        'pop-yellow': '#FFFF99',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
