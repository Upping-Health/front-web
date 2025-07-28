const tailwindColors = require('tailwindcss/colors')

const colors = {
  primary: '#306169',
  red: {
    ...tailwindColors.red,
    DEFAULT: '#ef4444',
  },
  white: '#FFFFFF',
  black: '#323031',
  gray: {
    ...tailwindColors.gray,
    DEFAULT: '#D9D9D9',
  },
  newGray: '#D9D9D9',
  customGray: '#e5e7eb',
  darkGray: '#B8B8B8',
  light: {
    ...tailwindColors.light,
    DEFAULT: '#F5F5F5',
  },
  green: {
    ...tailwindColors.green,
    DEFAULT: '#41b96f',
  },
  terciary: '#4b8690',
  unpaid: '#ffcdd2',
  unpaidFont: ' #c62828',
  paid: '#c8e6c9',
  paidFont: '#388e3c',
  newYellow: '#F0F005',
}

export { colors }
