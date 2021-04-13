module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '375px',
      'sm': '575px',
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
    boxShadow: {
      'sm': '0px 1px 1px rgba(0, 0, 0, 0.25)',
      'md': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      'inset': 'inset 0 0 0 1.5px #DFDFDF',
      none: 'none',
    },
    extend: {
      colors: {
        'pop-white': '#F8F7EE',
        'pop-black': '#2D2D2D',
        'pop-black-dark': '#272727',
        'pop-gray': '#DFDFDF',
        'pop-mid-gray': "#8E8E8E",
        'pop-navy': '#212363',
        'pop-green': '#64FFE3',
        'pop-green-pale': '#E8FDF5',
        'pop-pink': '#FF0088',
        'pop-pink-pale': '#CDF2F4',
        'pop-blue': '#3A3EAB',
        'pop-yellow': '#FFFF99',
      },
      borderWidth: {
        '1': '0.5px',
        '16': '16px'
      },
      gap: {
        '0.5': '1px'
      }
    }
  },
  variants: {
    extend: {
      fontSize: ['hover', 'focus']
    },
  },
  plugins: [],
}
