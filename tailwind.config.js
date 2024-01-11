import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#7828c8",
            "issue-red": "#f31260",
            signature: "#a1acfb"
          },
        },
        dark: {
          colors: {
            primary: "#9353d3",
            "issue-red": "#f31260",
            signature: "#a1acfb"
          },
        },
      },
    }),
  ],
};
