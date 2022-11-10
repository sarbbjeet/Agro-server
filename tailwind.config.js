/** @type {import('tailwindcss').Config} */
const { colors } = require("./utils/constants");
const { p1, p2, p3, p4, p5, p6 } = colors;
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      custom: {
        p1,
        p2,
        p3,
        p4,
        p5,
        p6,
      },
    },
    extend: {},
  },
  plugins: [],
};
