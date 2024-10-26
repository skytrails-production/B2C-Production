/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if you're using TypeScript
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1a202c', // Replace with your desired color code
        },
      },
    },
  },
  plugins: [],
};
