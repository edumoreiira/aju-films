/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './src/styles.scss',
  ],
  theme: {
    extend: {

      
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
    },
  },
  plugins: [],
}

