/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          100: '#f7d4b8',
          800: '#232e42',
        },
      },
    },
  },
  plugins: [],
};
