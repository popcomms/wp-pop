module.exports = {
  purge: {
    enabled: true,
    content: [
        './src/**/*.php',
        './*.php',
        './templates/**/**/*.twig',
        './templates/partial/*.twig',
        './templates/**/*.twig',
        './templates/*.twig',
        './block/*.twig',
        './*.php',
        './static/**/*.php',
        './inc/**/*.php',
        './inc/*.php',
        './static/**/*.css',
        './static/*.js',
        './src/**/*.js'
    ],
    options: {
      safelist: [
        'text-pop-white',
        'text-pop-black',
        'text-pop-black-dark',
        'text-pop-gray',
        'text-pop-mid-gray',
        'text-pop-dark-gray',
        'text-pop-navy',
        'text-pop-green',
        'text-pop-green-pale',
        'text-pop-pink',
        'text-pop-pink-pale',
        'text-pop-blue',
        'text-pop-yellow',
        'text-pop-purple',
        'text-pop-white',
        'bg-pop-black',
        'bg-pop-black-dark',
        'bg-pop-gray',
        'bg-pop-mid-gray',
        'bg-pop-dark-gray',
        'bg-pop-navy',
        'bg-pop-green',
        'bg-pop-green-pale',
        'bg-pop-pink',
        'bg-pop-pink-pale',
        'bg-pop-blue',
        'bg-pop-yellow',
        'bg-pop-purple',
        'border-pop-black',
        'border-pop-black-dark',
        'border-pop-gray',
        'border-pop-mid-gray',
        'border-pop-dark-gray',
        'border-pop-navy',
        'border-pop-green',
        'border-pop-green-pale',
        'border-pop-pink',
        'border-pop-pink-pale',
        'border-pop-blue',
        'border-pop-yellow',
        'border-pop-purple',
        'rotate-0',
        'rotate-45',
        'rotate-90',
        'rotate-180',
        'rotate-270',
        '-rotate-45',
        '-rotate-90',
        '-rotate-180',
        '-rotate-270',
        'opacity-0',
        'opacity-10',
        'opacity-20',
        'opacity-30',
        'opacity-40',
        'opacity-50',
        'opacity-60',
        'opacity-70',
        'opacity-80',
        'opacity-90',
        'opacity-100',
        'bg-opacity-0',
        'bg-opacity-10',
        'bg-opacity-20',
        'bg-opacity-30',
        'bg-opacity-40',
        'bg-opacity-50',
        'bg-opacity-60',
        'bg-opacity-70',
        'bg-opacity-80',
        'bg-opacity-90',
        'bg-opacity-100',
        'order-1',
        'order-2',
        'order-3',
        'order-4',
        'order-5',
        'order-6',
        'order-7',
        'order-8',
        'order-9',
        'order-10',
        'order-11',
        'order-12',
        'order-13',
        'order-14',
        'order-15',
        'order-16',
        'order-17',
        'order-18',
        'order-19',
        'order-20',
        'order-21',
        'order-22',
        'order-23',
        'order-24',
        'order-25',
        'order-26',
        'order-27',
        'order-28',
        'order-29',
        'order-30',
        'left-40',
        'left-28',
        'right-0',
        'right-auto'
      ]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    // screens: {
    //   'xs': '375px',
    //   'sm': '575px',
    //   'md': '966px',
    //   'lg': '1024px',
    //   'xl': '1920px'
    // },
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
      },
      height: {
        'screen-1/2': '50vh'
      },
    }
  },
  variants: {
    extend: {
      colors: ['hover', 'group-hover', 'bg-opacity'],
      fontSize: ['hover', 'focus'],
      flex: ['group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
      rotate: ['group-hover'],
      backgroundColor: ['hover', 'group-hover'],
      textColor: ['hover', 'group-hover'],
      display: ['group-hover']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}
