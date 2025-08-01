import type { Config } from 'tailwindcss'
import { colors } from './src/utils/colors/colors'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        top: '0 -1px 10px 0px rgba(0, 0, 0, 0.1)',
        'top-lg': '0 -7px 20px -7px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        ...colors,
      },
      borderRadius: {
        full: '100%',
        '20': '20px',
        xl: '8px',
        '6': '6px',
      },
    },
    screens: {
      d: '1140px',
      t: { min: '768px', max: '1139px' },
      s: { max: '767px' },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
