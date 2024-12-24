/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
    colors: {
      red: '#FF0000',
      black: '#000000',
      gray: '#6b6a6a',
      'gray-light': '#f6f6f6',
      'gray-medium': '#bebebe',
      white: '#FFFFFF',
      yellow: '#F6C725',
      orange: '#F5CBA0',
      'orange-strong': '#F4A76E',

      blue: '#A3C1DA',
      green: '#c2e5bb',
      'green-strong': '#76da63',
      lilac: '#E3C7E3',
      'lilac-strong': '#D392D3',
      purple: '#720272',
      pink: '#e91e63',

      'emerald-dark': '#073d2c',
      teal: '#17E1E3',
      'teal-light': '#B7E3E3',
      indigo: '#171B4A',
      'indigo-light': '#45486E',
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '22px'],
      xl: ['21px', '28px'],
      '2xl': ['24px', '32px'],
      '4xl': ['34px', '40px'],
      '5xl': ['48px', '50px'],
    },
  },
  plugins: [],
}

