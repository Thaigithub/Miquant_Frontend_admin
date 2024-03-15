/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        'main-blue': '#355ED4',
        'blue-00': '#E5ECFF',
        'blue-01': '#F5F8FF',
        'gray-00': '#FAFBFF',
        'gray-01': '#ECEEF5',
        'gray-03': '#D2D5E0',
        'gray-04': '#C6C9D6',
        'gray-05': '#AEB2C1',
        'gray-06': '#989CAD',
        'gray-08': '#6E7283',
        'gray-10': '#474B5A',
        'gray-13': '#1D1F28',
      },
      fontSize: {
        xs: ['12px', '150%'],
        sm: ['14px', '150%'],
        base: ['16px', '150%'],
        lg: ['18px', '150%'],
        xl: ['20px', '150%'],
        '2xl': ['24px', '150%'],
        '3xl': ['30px', '150%'],
        '4xl': ['36px', '150%'],
        '5xl': ['48px', '150%'],
        '6xl': ['60px', '150%'],
        '7xl': ['72px', '150%'],
        '8xl': ['96px', '150%'],
        '9xl': ['128px', '150%'],
      },
      borderRadius: {
        5: '5px',
      },
    },
  },
  plugins: [],
};
