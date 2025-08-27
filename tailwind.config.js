/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './src/styles.scss',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(28.78deg 53.85% 64.31%)',
      },
      
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },

      screens: {
        'xs': '430px', 
        
      },
    },
  },
  plugins: [],
}

