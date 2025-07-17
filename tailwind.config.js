/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Tailwind blue-600
        secondary: '#9333ea', // Purple-600
      },
    },
  },
  plugins: [],
};
