/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: { max: "90em" },
        lg: { max: "74em" },
        md: { max: "64em" },
        sm: { max: "48em" },
        xs: { max: "30em" },
      },
    },
  },
  plugins: [],
};
