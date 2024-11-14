const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("node:path");
const { typographyStyles } = require("./typography");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    join(
      __dirname,
      "{components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,mdx}",
    ),
    "../../node_modules/@rafty/ui/**/*.js",
    ...createGlobPatternsForDependencies(__dirname),
    "../../node_modules/@rafty/**/*.js",
  ],
  theme: {
    typography: typographyStyles,
    extend: {
      colors: {
        primary: colors.sky,
      },
      boxShadow: {
        glow: "0 0 4px rgb(0 0 0 / 0.1)",
      },
      maxWidth: {
        lg: "33rem",
        "2xl": "40rem",
        "3xl": "50rem",
        "5xl": "66rem",
      },
      opacity: {
        1: "0.01",
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15",
      },
      animation: {
        rotate: "rotate 5s linear infinite",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@rafty/plugin")],
};
