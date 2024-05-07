/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bl: "#28374B",
        gr: "#11C158",
        gre: "#9C9A9A",
      },
    },
  },
  plugins: [],
};
