import type { Config } from 'tailwindcss'




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
        primary: '#22B349',
        red: '#FF3A20',
        white: '#FFFFFF',
        black: '#323031',
        newGray: '#D9D9D9',
        gray: '#e5e7eb',
        darkGray: '#B8B8B8',
        light: '#F5F5F5',
        green: '#219F02',
        terciary: '#1C6E8C',
        unpaid: '#ffcdd2',
        unpaidFont:' #c62828',
        paid: '#c8e6c9',
        paidFont: '#388e3c',
  
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
