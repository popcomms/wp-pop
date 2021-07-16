module.exports = {
  // purge: [],
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
      '6xl': '4rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      normal: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
      '13': '13',
      '14': '14',
      '15': '15',
      '16': '16',
      '17': '17',
      '18': '18',
      '19': '19',
      '20': '20',
      '21': '21',
      '22': '22',
      '23': '23',
      '24': '24',
      '25': '25',
      '26': '26',
      '27': '27',
      '28': '28',
      '29': '29',
      '30': '30'
    },
    // boxShadow: {
    //   'sm': '0px 1px 1px rgba(0, 0, 0, 0.25)',
    //   'md': '0px 4px 4px rgba(0, 0, 0, 0.25)',
    //   'inset': 'inset 0 0 0 1.5px #DFDFDF',
    //   none: 'none',
    // },
    extend: {
      colors: {
        'pop-white': '#FFFFFF',
        'pop-black': '#2D2D2D',
        'pop-black-dark': '#272727',
        'pop-gray': '#DFDFDF',
        'pop-mid-gray': "#8E8E8E",
        'pop-dark-gray': "#3C3B3B",
        'pop-navy': '#212363',
        'pop-green': '#64FFE3',
        'pop-green-pale': '#E8FDF5',
        'pop-pink': '#FF0088',
        'pop-pink-pale': '#CDF2F4',
        'pop-blue': '#3A3EAB',
        'pop-yellow': '#FFFF99',
        'pop-purple': '#6F62FF'
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
      fontSize: ['hover', 'focus'],
      flex: ['group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
      rotate: ['group-hover']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
