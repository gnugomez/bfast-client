const { guessProductionMode } = require("@ngneat/tailwind");
const defaultTheme = require("tailwindcss/defaultTheme");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      m2xl: { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      mxl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      mlg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      mmd: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      msm: { max: "639px" },
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#3EA4F4",
        secondary: {
          gray: "#F3F3F3",
        },
        main: {
          dark: "#222222",
          gray: "#7B7B7B",
        },
      },
      borderRadius: {
        "4xl": "2.33rem",
        "5xl": "2.9rem",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        app: "rgb(0 0 0 / 13%) 0px 4px 10px, rgb(0 0 0 / 5%) 0px 0px 3px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
