/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './src/styles.scss',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d4a474',
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

