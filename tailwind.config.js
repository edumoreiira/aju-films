/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './src/styles.scss',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(200.15deg 72% 55.82%)',
      },
      
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },

      screens: {
        'xs': '390px', 
      },
    },
  },
  plugins: [],
}

