module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '375px',
      'md': '966px',
      'lg': '1024px',
      'xl': '1920px'
    },
    fontFamily: {
      'default': ['Poppins', 'Arial', 'sans-serif']
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.3125rem',
      '2xl': '1.75rem',
      '3xl': '2.25rem',
      '4xl': '2.625rem',
      '5xl': '3.5rem',
      '6xl': '4rem'
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
