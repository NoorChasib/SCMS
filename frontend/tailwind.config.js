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
      colors: {
        bg: {
          100: "#ffffff",
          300: "#1A1B1E",
        },
        blue: {
          100: "#ffffff",
          300: "#3da5d9",
          500: "#007ea7",
          700: "#003459",
          900: "#00171f",
        },
      },
    },
  },
  plugins: [],
};
