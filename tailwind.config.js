/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  mode: 'jit', // <-- add this line
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
    // './src/packages/**/*.{js,ts,jsx,tsx}',
    // './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },},
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const screens = theme('screens', {});
      addComponents([
        {
          '.container': { width: '100%', margin: '0 auto' },
          '.container-sm': { width: '100%', margin: '0 auto' },
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            '.container': {
              'max-width': '540px',
            },
            '.container-sm': {
              'max-width': '540px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            '.container': {
              'max-width': '720px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            '.container': {
              'max-width': '960px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            '.container': {
              'max-width': '1106px',
            },
            '.container-sm': {
              'max-width': '640px',
            },
          },
        },
      ]);
    }),
    require('@tailwindcss/line-clamp'),
  ],
};
