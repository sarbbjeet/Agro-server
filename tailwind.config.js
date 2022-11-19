/** @type {import('tailwindcss').Config} */
const { colors } = require("./utils/constants");
const _colors = require("tailwindcss/colors");
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
        transparent: "transparent",
        transparent_back: "rgba(30,30,30,0.9)",
        current: "currentColor",
        white: "#ffffff",
        light: "#eee",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        "p1-dark": "#1a1F26",
        "p1-dark_new": "#212a33",
        "p1-dark-h": "#001723",
        "p6-dark": "#F1630E", //yellow
        primary: "#0E89FF",
      },
    },
    extend: {},
  },
  plugins: [],
};
