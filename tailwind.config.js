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
      },
    },
  },
  plugins: [],
};
