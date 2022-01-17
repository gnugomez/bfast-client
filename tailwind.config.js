const { guessProductionMode } = require("@ngneat/tailwind");
const defaultTheme = require("tailwindcss/defaultTheme");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  content: [
    "./src/app/views/**/**/*.{html,ts,css,scss,sass,less,styl}",
    "./src/app/layouts/**/**/*.{html,ts,css,scss,sass,less,styl}",
    "./src/app/components/**/**/*.{html,ts,css,scss,sass,less,styl}",
  ],
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
        main: {
          dark: {
            DEFAULT: "#222222",
            dimed: "#666666",
          },
          gray: {
            DEFAULT: "#7B7B7B",
            dimed: "#F3F3F3",
            relaxed: "#F9F9F9",
          },
        },
        light: {
          50: "#fdfdfd",
          100: "#fcfcfc",
          200: "#fafafa",
          300: "#f8f9fa",
          400: "#f6f6f6",
          500: "#f2f2f2",
          600: "#f1f3f5",
          700: "#e9ecef",
          800: "#dee2e6",
          900: "#dde1e3",
        },
        dark: {
          50: "#4a4a4a",
          100: "#3c3c3c",
          200: "#323232",
          300: "#2d2d2d",
          400: "#222222",
          500: "#1f1f1f",
          600: "#1c1c1e",
          700: "#1b1b1b",
          800: "#181818",
          900: "#0f0f0f",
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
        app: "rgba(0, 0, 0, 0.13) 0px 4px 10px, rgba(0, 0, 0, 0.05) 0px 0px 3px",
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
