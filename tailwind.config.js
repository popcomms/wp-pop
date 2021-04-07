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
    boxShadow: {
      'sm': '0px 1px 1px rgba(0, 0, 0, 0.25)',
      'md': '0px 4px 4px rgba(0, 0, 0, 0.25)',
    //   sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    //   DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    //   md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    //   lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    //   xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    //   '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    //  '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    //   inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
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
      },
      borderWidth: {
        '1': '1px',
        '16': '16px'
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
