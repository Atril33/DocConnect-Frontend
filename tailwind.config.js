const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('/public/assets/background2.jpg')",
        'home-background-mobile': "url('/public/assets/background2-mobile.jpg')",
        logo: "url('/public/assets/logo.png')",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar ': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar ': {
          display: 'none',
        },
      });
    }),
  ],
};
