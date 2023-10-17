/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,ts,tsx}"];
export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      montserrat: ["Montserrat"],
      baebneue: ["Bebas Neue"],
    },

    screens: {
      sm: "500px",
      // => @media (min-width: 500px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
};
export const plugins = [];
