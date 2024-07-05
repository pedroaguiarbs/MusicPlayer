/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        montanha: "url('./src/images/mountain.jpg')",
      },
    },
  },
  plugins: [],
};
